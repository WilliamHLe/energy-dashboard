import { Request, Response, NextFunction } from 'express';
import Category, { ICategory } from '../models/categories.model';
import Building, { IBuilding } from '../models/buildings.model';
import metricsService, { IMetrics } from '../services/metrics.service';

/**
 * Controller to handle fetching the metrics (collection of miscellanious information) for a
 * building or category name. These are coming from a 'slug' which should contain one of them.
 * The controller check if the slug is a category or building and calls the correct service to
 * get the metrics.
 * @param {Request} req - Express request. Should contain a slug (category or building name).
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const metricsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    const category: ICategory | null = await Category.findOne({ name: slug });
    if (category) {
      const metrics: IMetrics = await metricsService.categoryMetrics(category.id);

      const percentEnergySaved = metricsService.calculatePercentageSaved(
        metrics.energyUsedCurrentYear, metrics.energyUsedLastYear,
      );

      res.send({
        energyUsed: metrics.energyUsedCurrentYear,
        energySaved: percentEnergySaved,
        area: metrics.area,
        buildings: metrics.buildings,
      });

      return;
    }

    const building: IBuilding | null = await Building.findOne({ name: slug });
    if (building) {
      const metrics: IMetrics = await metricsService.categoryMetrics(building.category);

      const percentEnergySaved = metricsService.calculatePercentageSaved(
        metrics.energyUsedCurrentYear, metrics.energyUsedLastYear,
      );

      res.send({
        energyUsed: metrics.energyUsedCurrentYear,
        energySaved: percentEnergySaved,
        area: metrics.area,
        buildings: metrics.buildings,
      });
      return;
    }

    next('Invalid slug');
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle fetching the metrics (collection of miscellanious information) for a
 * category based on a category name. This is done by using a service to find the metrics by
 * the category id.
 * @param {Request} req - Express request. Should contain a category name.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const metricsByCategoryName = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const category: ICategory | null = await Category.findOne({ name: req.params.name });
    if (category) {
      const metrics = await metricsService.categoryMetrics(category.id);

      const percentEnergySaved = metricsService.calculatePercentageSaved(
        metrics.energyUsedCurrentYear, metrics.energyUsedLastYear,
      );

      res.send({
        energyUsed: metrics.energyUsedCurrentYear,
        energySaved: percentEnergySaved,
        area: metrics.area,
        buildings: metrics.buildings,
      });
    }

    next('Category not found');
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle fetching the metrics (collection of miscellanious information) for a
 * category based on a building id. This is done by finding which category the building belongs
 * to and using a service to get the metrics for this category.
 * @param {Request} req - Express request. Should contain a building id.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const metricsByBuildingId = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const building: IBuilding | null = await Building.findById(req.params.id);
    if (building) {
      const metrics: IMetrics = await metricsService.categoryMetrics(building.category);

      const percentEnergySaved = metricsService.calculatePercentageSaved(
        metrics.energyUsedCurrentYear, metrics.energyUsedLastYear,
      );

      res.send({
        energyUsed: metrics.energyUsedCurrentYear,
        energySaved: percentEnergySaved,
        area: metrics.area,
        buildings: metrics.buildings,
      });
    }

    next('Building not found');
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle fetching the metrics (collection of miscellanious information) for all
 * categories. This is done by finding all the categories and using a service to gather the
 * information for each category before reducing the results together.
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const metrics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();

    const responses: IMetrics[] = await Promise.all(categories.map(
      async (category: ICategory) => metricsService.categoryMetrics(category.id),
    ));

    const totalMetrics: IMetrics = responses.reduce((prev, current) => ({
      energyUsedCurrentYear: prev.energyUsedCurrentYear + current.energyUsedCurrentYear,
      energyUsedLastYear: prev.energyUsedLastYear + current.energyUsedLastYear,
      area: prev.area + current.area,
      buildings: prev.buildings + current.buildings,
    }));

    const percentEnergySaved = metricsService.calculatePercentageSaved(
      totalMetrics.energyUsedCurrentYear, totalMetrics.energyUsedLastYear,
    );

    res.send({
      energyUsed: totalMetrics.energyUsedCurrentYear,
      energySaved: percentEnergySaved,
      area: totalMetrics.area,
      buildings: totalMetrics.buildings,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  metrics,
  metricsBySlug,
  metricsByCategoryName,
  metricsByBuildingId,
};
