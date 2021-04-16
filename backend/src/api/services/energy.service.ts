import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';
import { ICategory } from '../models/categories.model';
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
export interface EnergyAverage {
  average: number,
  date: string
}

export interface EnergyAverageByCategory {
  category: ICategory,
  average: EnergyAverage[]
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

// Calculate time series data energy usage
const energyUsage = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<Usage[]> => {
  let query:object[] = [
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
  query = filterQueryBydate(query, 2, fromDate, toDate);

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

/**
 * Calculates the average energy by slug.
 * The average is calculated by year if no from or to dates are specified.
 * Slug can either be a specific category or a specific builiding.
 * @param {string[]} buildingIds - List of building ids
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {Carrier[]} - Carriers with their summed energy usage for the given buildings
 */
const energyAverageBySlug = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<EnergyAverage[]> => {
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
        _id: {
          $dateToString: {
            format: '%Y',
            date: '$measurements.date',
          },
        },
        value: { $sum: '$measurements.measurement' },
      },
    },
    {
      $group: {
        _id: null,
        avg: {
          $avg: '$value',
        },
      },
    },
  ];
  query = filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

const energyAverageGroupedByCategory = async (
  fromDate?: string, toDate?: string,
): Promise<EnergyAverageByCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.getBuildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      average: await energyAverageBySlug(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

export default {
  carriers,
  carriersByBuildings,
  energyUsage,
  energyUsageByCategory,
  energyAverageBySlug,
  energyAverageGroupedByCategory,
};
