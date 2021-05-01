import mongoose from 'mongoose';
import {
  IEnergyCategory, IEnergyUsageCategory, IWeeklyUsage, IUsage,
} from '../../types/interfaces';
import Sensor from '../models/sensors.model';
import buildingService from './buildings.service';
import common from '../../util/common';

/**
 * calculates the total energy used for a building or a category.
 * Used by energy.controller to get total energy by slug
 * and buildings.controller to get total energy bu building id.
 * @param {stirng[]} buildingIds - BuildingIds,
 * either on id of a building or several for all buildigs in a category.
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {number} - summarized energy usage
 */
const sumEnergyUsageByIds = async (
  buildingIds: string[], fromDate?: Date, toDate?: Date,
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

  query = common.filterQueryBydate(query, 1, fromDate, toDate);
  const results = await Sensor.aggregate(query);
  if (results.length === 0) {
    return -1;
  }
  return results[0].total;
};

/**
 * calculates the total energy usage for each category
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {IEnergyCategory[]} - List of categories and their total energy usage
 */
const sumEnergyUsageByCategory = async (
  fromDate?: Date, toDate?: Date,
): Promise<IEnergyCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      total: await sumEnergyUsageByIds(
        buildingCategory.buildings, fromDate, toDate,
      ),
    })),
  );
};

/**
 * calculates the energy usage per day for either a specific building or a category og buildings
 * @param {string[]} buildingIds - BuildingIds for one building or a category
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {IUsage[]} - List of usage and dates
 */
const energyUsageByIds = async (
  buildingIds: string[], fromDate?: Date, toDate?: Date,
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
  query = common.filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

/**
 * calculates the energy usage for each category
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {IEnergyUsageCategory[]} - List of categories and their energy usage
 */
const energyUsageByCategory = async (
  fromDate?: Date, toDate?: Date,
): Promise<IEnergyUsageCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      usage: await energyUsageByIds(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

/**
 * calculates the weekly usage for a specific building
 * @param {string} buildingId - BuildingId for a specific building
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {IWeeklyUsage[]} - List of weeks and usage for that week
 */
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
  sumEnergyUsageByIds,
  energyUsageByIds,
  energyUsageByCategory,
  sumEnergyUsageByCategory,
  sumEnergyUsageWeekly,
};
