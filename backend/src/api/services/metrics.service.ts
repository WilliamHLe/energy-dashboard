import mongoose from 'mongoose';
import { IEnergyUsed, IMetrics } from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import energyUsageService from './energyUsage.service';

/**
 * Fetches the number of buildings in the given category by id.
 * @param {string} categoryId - The category id
 * @returns {number} - The number of buildings in this category
 */
const numberOfBuildingsByCategory = async (
  categoryId: string,
): Promise<number> => Building.countDocuments({ category: categoryId });

/**
 * Calculates the area (m^2) of all the buildings in the given category by id.
 * @param {string} categoryId - The id of the category to get area (m^2) for
 * @returns {number} - The area
 */
const areaByCategory = async (categoryId: string): Promise<number> => {
  const results = await Building.aggregate([
    {
      $match: {
        category: mongoose.Types.ObjectId(categoryId),
      },
    },
    {
      $group: {
        _id: null,
        totalArea: { $sum: '$area' },
      },
    },
  ]);

  return results[0].totalArea;
};

/**
 * Finds all buildings in category by the category id
 * @param {string} categoryId - The category id
 * @returns {IBuilding[]} - List of buildings
 */
const getBuildingsByCategoryId = async (categoryId: string): Promise<IBuilding[]> => (
  Building.find({ category: categoryId }).select('_id'));

/**
 * calculates the energy used the last two years by category
 * @param {string} categoryId - The category id
 * @returns {IEnergyUsed} - The energy used last year and current year for the category
 */
const energyUsedLastTwoYearsByCategory = async (categoryId: string): Promise<IEnergyUsed> => {
  const buildings: IBuilding[] = await getBuildingsByCategoryId(categoryId);
  const buildingIds: string[] = buildings.map((building) => building._id);

  // HARDCODING CURRENT YEAR TO LATEST YEAR IN DATASET TO DEMONSTRATE THE APPLICATION
  const latestYearInDataset = 2019;
  const currentEnd = new Date();
  currentEnd.setFullYear(latestYearInDataset);
  const currentStart = new Date(latestYearInDataset, 0, 1);
  const lastEnd = new Date(currentEnd);
  lastEnd.setFullYear(currentEnd.getFullYear() - 1);
  const lastStart = new Date(currentStart);
  lastStart.setFullYear(currentStart.getFullYear() - 1);

  const energyUsedLastYear = await energyUsageService.sumEnergyUsageByIds(
    buildingIds,
    lastStart.toISOString(),
    lastEnd.toISOString(),
  );
  const energyUsedCurrentYear = await energyUsageService.sumEnergyUsageByIds(
    buildingIds,
    currentStart.toISOString(),
    currentEnd.toISOString(),
  );

  return {
    category: categoryId,
    energyUsedCurrentYear,
    energyUsedLastYear,
  };
};

/**
 * Calculates all metrics (collection of miscellanious information) for a category based on its id.
 * This includes information about energy used so far this year, energy saved in % compared to last
 * year, total area (m^2) and number of buildings in this category.
 * @param {ICategory} categoryId - The id of the category to get metrics for
 * @returns {IMetrics} - The metrics for the category
 */
const categoryMetrics = async (categoryId: string): Promise<IMetrics> => {
  const energyUsed = await energyUsedLastTwoYearsByCategory(categoryId);

  const area: number = await areaByCategory(categoryId);
  const numBuildings: number = await numberOfBuildingsByCategory(categoryId);

  return {
    energyUsedCurrentYear: energyUsed.energyUsedCurrentYear,
    energyUsedLastYear: energyUsed.energyUsedLastYear,
    area,
    buildings: numBuildings,
  };
};

// calculates the percentage of energy saved.
// used in highscore.service.ts and energySaved.service.ts
const calculatePercentageSaved = (currentYear: number, lastYear: number): number => {
  const diff = lastYear - currentYear;
  return Number(((diff / lastYear) * 100).toFixed(2));
};

export default {
  categoryMetrics,
  calculatePercentageSaved,
  energyUsedLastTwoYearsByCategory,
};
