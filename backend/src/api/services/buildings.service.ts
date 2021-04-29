import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';
import Building, { IBuilding } from '../models/buildings.model';
import { BuildingCategory, IBuildingEnergyTotal, IBuildingScore } from '../../types/interfaces';

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

const getBuildingsByCategory = async (categoryId: string): Promise<IBuilding[]> => (
  Building.find({ category: categoryId }).select('_id')
);

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

const calculatePercentageSaved = (currentYear: number, lastYear: number): number => {
  const diff = lastYear - currentYear;
  return Number(((diff / lastYear) * 100).toFixed(2));
};

const getHighscoresByCategory = async (categoryId: string): Promise<IBuildingScore[]> => {
  const buildings = await getBuildingsByCategory(categoryId);
  const buildingIds = buildings.map((building) => building._id);

  // hardcoded years to match the last two years in the dataset
  const currentFromDate = new Date('2019-01-01');
  const currentToDate = new Date();
  currentToDate.setFullYear(2019);
  const prevFromDate = new Date('2018-01-01');
  const prevToDate = new Date();
  prevToDate.setFullYear(2018);

  const [current, prev] = await Promise.all([
    totalEnergyUsageForEachBuilding(buildingIds, currentFromDate, currentToDate),
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
      score: calculatePercentageSaved(b.total, prevBuilding.total),
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
  getBuildingsGroupedByCategory,
  getHighscoresByCategory,
};
