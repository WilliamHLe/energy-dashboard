import mongoose from 'mongoose';
import { IEnergyAverage, IEnergyAverageByCategory } from '../../types/interfaces';
import Sensor from '../models/sensors.model';
import buildingService from './buildings.service';
import common from '../../util/common';

/**
 * Calculates the average energy by slug.
 * The average is calculated by year if no from or to dates are specified.
 * Slug can either be a specific category or a specific builiding.
 * @param {string[]} buildingIds - List of building ids
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {ICarrier[]} - Carriers with their summed energy usage for the given buildings
 */
const energyAverageBySlug = async (
  buildingIds: string[], fromDate?: Date, toDate?: Date,
): Promise<IEnergyAverage[]> => {
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
        _id:
            {
              building: '$building',
              date: {
                $dateToString: {
                  format: '%Y',
                  date: '$measurements.date',
                },
              },
            },
        value: { $sum: '$measurements.measurement' },
      },
    },
    {
      $group: {
        _id: '$_id.building',
        average: {
          $avg: '$value',
        },
      },
    },
    {
      $group: {
        _id: null,
        avg: { $avg: '$average' },
      },
    },
    {
      $project: {
        _id: 0,
        average: { $trunc: ['$avg'] },
      },
    },
  ];
  query = common.filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

/**
   * Calculates the average energy for each category.
   * The average is calculated by year if no from or to dates are specified.
   * @param {Date} [fromDate] - The earliest date to include
   * @param {Date} [toDate] - The latest date to include
   * @returns {IEnergyAverageByCategory[]} - List with categories and their energy average
   */
const energyAverageGroupedByCategory = async (
  fromDate?: Date, toDate?: Date,
): Promise<IEnergyAverageByCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      average: await energyAverageBySlug(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

export default {
  energyAverageBySlug,
  energyAverageGroupedByCategory,
};
