import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';
import { ICategory } from '../models/categories.model';
import Building from '../models/buildings.model';
import buildingService from './buildings.service';

export interface Carrier {
  name: string,
  amount: number
}

export interface CarrierCategory {
  category: ICategory,
  carriers: Carrier[]
}

export interface Usage {
  usage: number,
  date: string
}

export interface EnergyUsageCategory {
  category: ICategory,
  total: Usage[]
}

/**
 * Adds a filter to the query. This will filter the query on the sensors mesurement date.
 * @param {object[]} query - The mongoose query to add the filter to
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {object[]} - The query with the added filter
 */
const filterQueryBydate = (
  query: object[], index: number, fromDate?: string, toDate?: string,
): object[] => {
  if (fromDate || toDate) {
    const filter: any = {
      ...((fromDate || toDate) && {
        $match: {
          'measurements.date': {
            ...(fromDate && { $gte: new Date(fromDate) }),
            ...(toDate && { $lte: new Date(toDate) }),
          },
        },
      }),
    };

    query.splice(index, 0, filter);
  }

  return query;
};

/**
 * Calculates the amount of energy used of each energycarrier type based on a list of buildings.
 * A regular use-case for this function would be to find the carrier usage for a category
 * (a list of buildings in the same category) or a list of length 1 with a single building.
 * @param {string[]} buildingIds - List of building ids
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {Carrier[]} - Carriers with their summed energy usage for the given buildings
 */
const carriersByBuildings = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<Carrier[]> => {
  let query: object[] = [
    {
      $match: {
        building: { $in: buildingIds.map((id) => mongoose.Types.ObjectId(id)) },
        type: 'Forbruksmåler',
      },
    },
    {
      $unwind: '$measurements',
    },
    {
      $group: {
        _id: '$measurement',
        amount: {
          $sum: {
            $sum: '$measurements.measurement',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        amount: '$amount',
      },
    },
  ];

  // want to insert the filter after the unwind operation (index 2)
  query = filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

/**
 * Calculates the energy usage by carrier for all categories
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {CarrierCategory[]} - A list of categories and their carriers
 */
const carriers = async (fromDate?: string, toDate?: string): Promise<CarrierCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.getBuildingsGroupedByCategory();

  return Promise.all(buildingsGroupedByCategory.map(async (buildingCategory) => ({
    category: buildingCategory.category,
    carriers: await carriersByBuildings(buildingCategory.buildings, fromDate, toDate),
  })));
};

export interface BuildingCategory {
  category: ICategory,
  buildings: string[]
}

export interface EnergyCategory {
  category: ICategory,
  total: number
}

const sumEnergyUsage = async (
  buildingId?: mongoose.Types.ObjectId, fromDate?: string, toDate?: string,
): Promise<number> => {
  const query = [
    {
      $match: {
        type: 'Forbruksmåler',
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: { $sum: '$measurements.measurement' },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ];

  // Check if query parameter fromDate or toDate exists, if yes add filter query
  if (fromDate || toDate) {
    const filter: any = {
      $project: {
        measurements: {
          $filter: {
            input: '$measurements',
            as: 'measurement',
            cond: {
              $and: [
                fromDate ? { $gte: ['$$measurement.date', new Date(fromDate as string)] } : {},
                toDate ? { $lte: ['$$measurement.date', new Date(toDate as string)] } : {},
              ],
            },
          },
        },
      },
    };

    query.splice(1, 0, filter);
  }

  if (buildingId) {
    const match = {
      $match: {
        building: buildingId,
        type: 'Forbruksmåler',
      },
    };

    query.splice(0, 1, match);
  }

  const results = await Sensor.aggregate(query);
  return results[0];
};

const sumEnergyUsageBySlug = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<number> => {
  const query = [
    {
      $match: {
        building: { $in: buildingIds.map((id) => mongoose.Types.ObjectId(id)) },
        type: 'Forbruksmåler',
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: { $sum: '$measurements.measurement' },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ];

  if (fromDate || toDate) {
    const filter: any = {
      $project: {
        measurements: {
          $filter: {
            input: '$measurements',
            as: 'measurement',
            cond: {
              $and: [
                fromDate ? { $gte: ['$$measurement.date', new Date(fromDate as string)] } : {},
                toDate ? { $lte: ['$$measurement.date', new Date(toDate as string)] } : {},
              ],
            },
          },
        },
      },
    };

    query.splice(1, 0, filter);
  }

  const results = await Sensor.aggregate(query);
  return results[0].total;
};

/**
 * Groups buildings by id into categories
 * @returns {BuildingCategory[]} A list of categories and their associated buildings
 */
const getBuildingsGroupedByCategory = async (): Promise<BuildingCategory[]> => {
  const query = [
    {
      $group: {
        _id: '$category',
        buildings: { $push: '$_id' },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
  ];

  return Building.aggregate(query);
};

const sumEnergyUsageByCategory = async (
  fromDate?: string, toDate?: string,
): Promise<EnergyCategory[]> => {
  const buildingsGroupedByCategory = await getBuildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      total: await sumEnergyUsageBySlug(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

// Calculate time series data energy usage
const energyUsage = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<Usage[]> => {
  const query = [
    {
      $match: {
        building: { $in: buildingIds.map((id) => mongoose.Types.ObjectId(id)) },
        type: 'Forbruksmåler',
      },
    },
    {
      $unwind: '$measurements',
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$measurements.date',
          },
        },
        value: { $sum: '$measurements.measurement' },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        value: 1,
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ];

  if (fromDate || toDate) {
    const filter: any = {
      $project: {
        measurements: {
          $filter: {
            input: '$measurements',
            as: 'measurement',
            cond: {
              $and: [
                fromDate ? { $gte: ['$$measurement.date', new Date(fromDate as string)] } : {},
                toDate ? { $lte: ['$$measurement.date', new Date(toDate as string)] } : {},
              ],
            },
          },
        },
      },
    };

    query.splice(1, 0, filter);
  }

  return Sensor.aggregate(query);
};

const energyUsageByCategory = async (
  // TODO: Hente forventet forbruk
  // eslint-disable-next-line no-unused-vars
  fromDate?: string, toDate?: string, expected?: string,
): Promise<EnergyUsageCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.getBuildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      total: await energyUsage(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

export default {
  carriers,
  carriersByBuildings,
  sumEnergyUsage,
  sumEnergyUsageBySlug,
  getBuildingsGroupedByCategory,
  sumEnergyUsageByCategory,
  energyUsage,
  energyUsageByCategory,
};
