import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';
import { ICategory } from '../models/categories.model';
import Building, { IBuilding } from '../models/buildings.model';
import buildingService from './buildings.service';

export interface Carrier {
  name: string,
  amount: number
}

export interface IWeeklySaved {
  week: string,
  percentSaved: number,
}

export interface IWeeklyUsage {
  week: string,
  sum: number,
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
 * OBS: POTENSIELT BROKEN
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
        amount: { $trunc: ['$amount'] },
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
        total: { $trunc: ['$total'] },
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

const sumEnergyUsageByBuildingIds = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<number> => {
  const query:object[] = [
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
        total: { $trunc: ['$total'] },
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

  const results = await Sensor.aggregate(query);
  return results[0].total; // OBS: Can crash if not found
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
      total: await sumEnergyUsageByBuildingIds(buildingCategory.buildings, fromDate, toDate),
    })),
  );
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
    {
      $project: {
        avg: { $trunc: ['$value'] },
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

const sumEnergyUsageWeekly = async (
  buildingId: string, fromDate: Date, toDate: Date,
): Promise<IWeeklyUsage[]> => {
  const query: object[] = [
    {
      $unwind: '$measurements',
    },
    {
      $match: {
        building: buildingId,
        type: 'Forbruksmåler',
        'measurements.date': { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%V',
            date: '$measurements.date',
          },
        },
        sum: { $sum: '$measurements.measurement' },
      },
    },
    {
      $project: {
        _id: 0,
        week: '$_id',
        sum: { $trunc: ['$sum'] },
      },
    },
  ];

  return Sensor.aggregate(query);
};

const calculatePercentageSaved = (currentYear: number, lastYear: number): number => {
  const diff = lastYear - currentYear;
  return Number(((diff / lastYear) * 100).toFixed(2));
};

const getSavedWeeklyByBuilding = async (building: IBuilding): Promise<IWeeklySaved[]> => {
  const prevFromDate = new Date('2018-01-01');
  const prevToDate = new Date('2019-01-01');
  const currFromDate = new Date('2019-01-01');
  const currToDate = new Date('2020-01-01');

  const [curr, prev] = await Promise.all([
    sumEnergyUsageWeekly(building._id, currFromDate, currToDate),
    sumEnergyUsageWeekly(building._id, prevFromDate, prevToDate),
  ]);

  const diff = curr.map((current) => {
    const lastYear: IWeeklyUsage | undefined = prev.find((p) => p.week === current.week);

    if (!lastYear) {
      return {
        week: current.week,
        sum: 0,
      };
    }

    return {
      week: current.week,
      sum: calculatePercentageSaved(current.sum, lastYear.sum),
    };
  });

  diff.sort((a: IWeeklyUsage, b: IWeeklyUsage) => {
    if (a.week < b.week) {
      return -1;
    }
    if (a.week > b.week) {
      return 1;
    }
    return 0;
  });

  return diff.map((el) => ({
    week: el.week,
    percentSaved: el.sum,
  }));
};

const getSavedEnergyByBuilding = async (building: IBuilding): Promise<number> => {
  const latestYearInDataset = 2019;
  const currentEnd = new Date();
  currentEnd.setFullYear(latestYearInDataset);
  const currentStart = new Date(latestYearInDataset, 0, 1);
  const lastEnd = new Date(currentEnd);
  lastEnd.setFullYear(currentEnd.getFullYear() - 1);
  const lastStart = new Date(currentStart);
  lastStart.setFullYear(currentStart.getFullYear() - 1);

  const [curr, prev] = await Promise.all([
    sumEnergyUsageByBuildingIds(
      [building._id], currentStart.toISOString(), currentEnd.toISOString(),
    ),
    sumEnergyUsageByBuildingIds(
      [building._id], lastStart.toISOString(), lastEnd.toISOString(),
    ),
  ]);

  return calculatePercentageSaved(curr, prev);
};

export default {
  carriers,
  carriersByBuildings,
  sumEnergyUsage,
  sumEnergyUsageByBuildingIds,
  getBuildingsGroupedByCategory,
  sumEnergyUsageByCategory,
  energyUsage,
  energyUsageByCategory,
  energyAverageBySlug,
  energyAverageGroupedByCategory,
  sumEnergyUsageWeekly,
  getSavedWeeklyByBuilding,
  getSavedEnergyByBuilding,
};
