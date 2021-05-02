import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';
import buildingService from './buildings.service';
import {
  ICarrier, ICarrierCategory,
} from '../../types/interfaces';
import common from '../../util/common';

/**
 * Calculates the amount of energy used of each energycarrier type based on a list of buildings.
 * A regular use-case for this function would be to find the carrier usage for a category
 * (a list of buildings in the same category) or a list of length 1 with a single building.
 * @param {string[]} buildingIds - List of building ids
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {ICarrier[]} - Carriers with their summed energy usage for the given buildings
 */
const carriersByBuildings = async (
  buildingIds: string[], fromDate?: Date, toDate?: Date,
): Promise<ICarrier[]> => {
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
  query = common.filterQueryBydate(query, 2, fromDate, toDate);

  return Sensor.aggregate(query);
};

/**
 * Calculates the energy usage by carrier for all categories
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {ICarrierCategory[]} - A list of categories and their carriers
 */
const energyCarriers = async (fromDate?: Date, toDate?: Date): Promise<ICarrierCategory[]> => {
  const buildingsGroupedByCategory = await buildingService.buildingsGroupedByCategory();

  return Promise.all(buildingsGroupedByCategory.map(async (buildingCategory) => ({
    category: buildingCategory.category,
    carriers: await carriersByBuildings(buildingCategory.buildings, fromDate, toDate),
  })));
};

export default {
  energyCarriers,
  carriersByBuildings,
};
