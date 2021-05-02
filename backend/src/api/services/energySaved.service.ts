import { IWeeklySaved, IWeeklyUsage } from '../../types/interfaces';
import { IBuilding } from '../models/buildings.model';
import energyUsageService from './energyUsage.service';
import metricsService from './metrics.service';
import dateUtil from '../../util/date';

const sortWeek = (diff: {week:string; sum: number;}[]) => {
  diff.sort((a: IWeeklyUsage, b: IWeeklyUsage) => {
    if (a.week < b.week) {
      return -1;
    }
    if (a.week > b.week) {
      return 1;
    }
    return 0;
  });
};
/**
 * Calculates the weekly saved energy for a specific building.
 *
 * @param {IBuilding} building - specific building
 * @returns {IWeeklySaved[]} - list of weeks and percentage saved that week
 */
const savedWeeklyByBuilding = async (
  building: IBuilding,
  currToDate: Date,
): Promise<IWeeklySaved[]> => {
  const currFromDate = dateUtil.getFirstDateInYear(currToDate);
  const prevToDate = dateUtil.previousYear(currToDate);
  const prevFromDate = dateUtil.getFirstDateInYear(prevToDate);

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

  sortWeek(diff);

  return diff.map((el) => ({
    week: el.week,
    percentSaved: el.sum,
  }));
};

/**
 * Calculates the percentage of enegy saved for a building
 *
 * @param {IBuilding} buildingId - Specific building
 * @param {Date} currtoDate - The current date
 * @returns {number} - Carriers with their summed energy usage for the given buildings
 */
const savedEnergyByBuilding = async (building: IBuilding, currToDate: Date): Promise<number> => {
  const currFromDate = dateUtil.getFirstDateInYear(currToDate);
  const prevToDate = dateUtil.previousYear(currToDate);
  const prevFromDate = dateUtil.getFirstDateInYear(prevToDate);

  const [curr, prev] = await Promise.all([
    energyUsageService.sumEnergyUsageByIds(
      [building._id], currFromDate, currToDate,
    ),
    energyUsageService.sumEnergyUsageByIds(
      [building._id], prevFromDate, prevToDate,
    ),
  ]);

  console.log('energy usage current:', curr);
  console.log('energy usage prev:', prev);
  console.log(curr === prev);
  console.log(`currToDate: ${currToDate}, currFromDate: ${currFromDate}`);
  console.log(`prevToDate: ${prevToDate}, prevFromDate: ${prevFromDate}`);

  return metricsService.calculatePercentageSaved(curr, prev);
};

export default {
  savedWeeklyByBuilding,
  savedEnergyByBuilding,
};
