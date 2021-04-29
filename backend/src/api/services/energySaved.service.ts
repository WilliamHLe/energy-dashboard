import { IWeeklySaved, IWeeklyUsage } from '../../types/interfaces';
import { IBuilding } from '../models/buildings.model';
import energyUsageService from './energyUsage.service';
import metricsService from './metrics.service';

/**
 * Calculates the weekly saved energy for a specific building.
 *
 * @param {IBuilding} building - specific building
 * @returns {IWeeklySaved[]} - list of weeks and percentage saved that week
 */
const savedWeeklyByBuilding = async (building: IBuilding): Promise<IWeeklySaved[]> => {
  const prevFromDate = new Date('2018-01-01');
  const prevToDate = new Date('2019-01-01');
  const currFromDate = new Date('2019-01-01');
  const currToDate = new Date('2020-01-01');

  const [curr, prev] = await Promise.all([
    energyUsageService.sumEnergyUsageWeekly(building._id, currFromDate, currToDate),
    energyUsageService.sumEnergyUsageWeekly(building._id, prevFromDate, prevToDate),
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
      sum: metricsService.calculatePercentageSaved(current.sum, lastYear.sum),
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

/**
 * Calculates the percentage of enegy saved for a building
 *
 * @param {IBuilding} buildingId - Specific building
 * @returns {number} - Carriers with their summed energy usage for the given buildings
 */
const savedEnergyByBuilding = async (building: IBuilding): Promise<number> => {
  const latestYearInDataset = 2019;
  const currentEnd = new Date();
  currentEnd.setFullYear(latestYearInDataset);
  const currentStart = new Date(latestYearInDataset, 0, 1);
  const lastEnd = new Date(currentEnd);
  lastEnd.setFullYear(currentEnd.getFullYear() - 1);
  const lastStart = new Date(currentStart);
  lastStart.setFullYear(currentStart.getFullYear() - 1);

  const [curr, prev] = await Promise.all([
    energyUsageService.sumEnergyUsageByBuildingIds(
      [building._id], currentStart.toISOString(), currentEnd.toISOString(),
    ),
    energyUsageService.sumEnergyUsageByBuildingIds(
      [building._id], lastStart.toISOString(), lastEnd.toISOString(),
    ),
  ]);

  return metricsService.calculatePercentageSaved(curr, prev);
};

export default {
  savedWeeklyByBuilding,
  savedEnergyByBuilding,
};
