import mongoose from 'mongoose';
import {
  IEnergyCategory, IEnergyUsageCategory,
  IBuildingEnergyTotal, IWeeklyUsage, IUsage,
} from '../../types/interfaces';
import Sensor from '../models/sensors.model';
import buildingService from './buildings.service';
import energyService from './energyCarriers.service';

/**
 * Calculates the total energy usage for each building
 * @param {string[]} buildingIds - List of building ids
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {IBuildingEnergyTotal[]} - List where each entry has an id, building and total energy
 */
const totalEnergyUsageForEachBuilding = async (
  buildingIds: string[], fromDate: Date, toDate: Date,
): Promise<IBuildingEnergyTotal[]> => {
  const query: object[] = [
    {
      $unwind: '$measurements',
    },
    {
      $match: {
        building: { $in: buildingIds.map((id) => mongoose.Types.ObjectId(id)) },
        type: 'Forbruksmåler',
        'measurements.date': { $gte: fromDate, $lte: toDate },
      },
    },
    {
      $group: {
        _id: '$building',
        total: {
          $sum: { $sum: '$measurements.measurement' },
        },
      },
    },
    {
      $lookup: {
        from: 'buildings',
        localField: '_id',
        foreignField: '_id',
        as: 'building',
      },
    },
    {
      $unwind: '$building',
    },
    {
      $project: {
        building: 1,
        total: { $trunc: ['$total'] },
      },
    },
  ];

  return Sensor.aggregate(query);
};

/**
 * Calculates the sum of the energy usage for a building.
 * checks if buildingId exists in $match
 * @param {mongoose.Types.ObjectId} buildingId - BuildingId for a specific building
 * @param {string} [fromDate] - The earliest date to include
 * @param {string} [toDate] - The latest date to include
 * @returns {number} - summarized energy usage
 */
const sumEnergyUsage = async (
  buildingId?: mongoose.Types.ObjectId, fromDate?: string, toDate?: string,
): Promise<number> => {
  let query:object[] = [
    {
      $match: {
        type: 'Forbruksmåler',
        ...(buildingId && { buildingId }),
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

  query = energyService.filterQueryBydate(query, 1, fromDate, toDate);
  const results = await Sensor.aggregate(query);
  return results[0];
};

const sumEnergyUsageByBuildingIds = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<number> => {
  let query:object[] = [
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

  query = energyService.filterQueryBydate(query, 1, fromDate, toDate);
  const results = await Sensor.aggregate(query);
  if (results.length === 0) {
    return -1;
  }
  return results[0].total;
};

const sumEnergyUsageByCategory = async (
  fromDate?: string, toDate?: string,
): Promise<IEnergyCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      total: await sumEnergyUsageByBuildingIds(
        buildingCategory.buildings, fromDate, toDate,
      ),
    })),
  );
};

// Calculate time series data energy usage
const energyUsage = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<IUsage[]> => {
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
        value: { $trunc: ['$value'] },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ];
  query = energyService.filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

const energyUsageByCategory = async (
  fromDate?: string, toDate?: string,
): Promise<IEnergyUsageCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      usage: await energyUsage(buildingCategory.buildings, fromDate, toDate),
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

export default {
  totalEnergyUsageForEachBuilding,
  sumEnergyUsage,
  sumEnergyUsageByBuildingIds,
  energyUsage,
  energyUsageByCategory,
  sumEnergyUsageByCategory,
  sumEnergyUsageWeekly,
};
