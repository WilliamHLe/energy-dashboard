import { IBuildingScore, IBuildingEnergyTotal } from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import energyUsageService from './energyUsage.service';
import metricsService from './metrics.service';

const getBuildingsByCategory = async (categoryId: string): Promise<IBuilding[]> => (
  Building.find({ category: categoryId }).select('_id')
);

const highscoresByCategory = async (categoryId: string): Promise<IBuildingScore[]> => {
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
    energyUsageService.totalEnergyUsageForEachBuilding(buildingIds, currentFromDate, currentToDate),
    energyUsageService.totalEnergyUsageForEachBuilding(buildingIds, prevFromDate, prevToDate),
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
