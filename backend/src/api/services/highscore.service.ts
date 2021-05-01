import mongoose from 'mongoose';
import { IBuildingScore, IBuildingEnergyTotal } from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import metricsService from './metrics.service';
import Sensor from '../models/sensors.model';
import dateUtil from '../../util/date';

const getBuildingsByCategory = async (categoryId: string): Promise<IBuilding[]> => (
  Building.find({ category: categoryId }).select('_id')
);

/**
 * Calculates the total energy usage for each building in the buildingIds parameter.
 * Used to calculate the higscores
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
 * calculates the score for each building in a category.
 * The score is based on how much energy is saved from last year in percentages.
 * @param {string} categoryId - The category id
 * @param {Date} currToDate - The current date
 * @returns {IBuildingScore[]} - List with all buildings in the category and their score
 */
const highscoresByCategory = async (
  categoryId: string, currToDate: Date,
): Promise<IBuildingScore[]> => {
  const buildings = await getBuildingsByCategory(categoryId);
  const buildingIds = buildings.map((building) => building._id);

  const currFromDate = dateUtil.getFirstDateInYear(currToDate);
  const prevToDate = dateUtil.previousYear(currToDate);
  const prevFromDate = dateUtil.getFirstDateInYear(prevToDate);

  const [current, prev] = await Promise.all([
    totalEnergyUsageForEachBuilding(buildingIds, currFromDate, currToDate),
    totalEnergyUsageForEachBuilding(buildingIds, prevFromDate, prevToDate),
  ]);

  const scores = current.map((b) => {
    const prevBuilding: IBuildingEnergyTotal | undefined = prev.find((b1) => b1._id.equals(b._id));

    if (!prevBuilding) {
      // no previous year for this building
      return {
        building: b.building,
        score: 0,
      };
    }

    return {
      building: b.building,
      score: metricsService.calculatePercentageSaved(b.total, prevBuilding.total),
    };
  });

  scores.sort((a: IBuildingScore, b: IBuildingScore) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });

  return scores;
};

export default {
  highscoresByCategory,
};
