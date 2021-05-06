import mongoose from 'mongoose';
import { IEnergyAverage, IEnergyAverageByCategory } from '../../types/interfaces';
import Sensor from '../models/sensors.model';
import buildingService from './buildings.service';
import common from '../../util/common';

/**
 * Calculates the yearly average energy for the provided buildings (aggregated).
 * @param {string[]} buildingIds - List of building ids
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {number} - The average energy useage in kWh
 */
const averageByYearForBuildings = async (
  buildingIds: string[], fromDate?: Date, toDate?: Date,
): Promise<number> => {
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

  const res: IEnergyAverage[] = await Sensor.aggregate(query);

  return res[0]?.average;
};

/**
 * Calculates the average energy for each category.
 * The average is calculated by year if no from or to dates are specified.
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {IEnergyAverageByCategory[]} - List with categories and their energy average
 */
const averageByYearForCategories = async (
  fromDate?: Date, toDate?: Date,
): Promise<IEnergyAverageByCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(
    buildingsGroupedByCategory.map(async (buildingCategory) => ({
      category: buildingCategory.category,
      average: await averageByYearForBuildings(buildingCategory.buildings, fromDate, toDate),
    })),
  );
};

export default {
  averageByYearForBuildings,
  averageByYearForCategories,
};
