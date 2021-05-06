import { Request, Response, NextFunction } from 'express';
import {
  ICarrier, ICarrierCategory, IEnergyAverageByCategory, IEnergySaved, IUsage,
} from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyCarriersService from '../services/energyCarriers.service';
import metricsService from '../services/metrics.service';
import energyUsageService from '../services/energyUsage.service';
import energyAverageService from '../services/energyAverage.service';
import categoryService from '../services/category.service';
import buildingsService from '../services/buildings.service';
import { ReqQueryDate } from '../../types/types';
import dateUtil from '../../util/date';

const bySlug = async (slug: string, func: Function, fromDate?: string, toDate?: string) => {
  const category: ICategory | null = await categoryService.findCategoryByName(slug);
  let buildings = [];

  if (category) {
    buildings = await Building.find({ category: category.id }).distinct('_id');
  } else {
    const building: IBuilding | null = await buildingsService.findBuildingByName(slug);
    if (!building) {
      throw Error('Slug is invalid');
    }
    buildings = [building.id];
  }

  return func(buildings, dateUtil.stringToDate(fromDate), dateUtil.stringToDate(toDate));
};

/**
 * Controller to handle fetching carriers for both categories and buildings by name. This is
 * done by first checking if the given req.params.slug is a category or building. If it is a
 * category the buildings of that category are found and used. The buildings are then sent to
 * the service which calculates the carrier usage of the building(s).
 * @param {Request} req - Express request. Should contain a slug.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getCarriersBySlug = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result:ICarrier[] = await bySlug(
      req.params.slug,
      energyCarriersService.carriersByBuildings,
      req.query.from_date,
      req.query.to_date,
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle finding carriers for all categories, grouped by category.
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getEnergyCarriers = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const results: ICarrierCategory[] = await energyCarriersService.energyCarriers(
      dateUtil.stringToDate(req.query.from_date),
      dateUtil.stringToDate(req.query.to_date),
    );

    res.send(results);
  } catch (err) {
    next(err);
  }
};

// Get total energy of each building category
const getTotalEnergy = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const totalEnergy = await energyUsageService.sumEnergyUsageByCategory(
      dateUtil.stringToDate(req.query.from_date),
      dateUtil.stringToDate(req.query.to_date),
    );

    res.send(totalEnergy);
  } catch (e) {
    next(e);
  }
};

// Get total energy by category or building name
const getTotalEnergyBySlug = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await bySlug(
      req.params.slug,
      energyUsageService.sumEnergyUsageByIds,
      req.query.from_date,
      req.query.to_date,
    );
    res.send({ total: result });
  } catch (err) {
    next(err);
  }
};

// Get time series energy usage of each building category
const getEnergyUsage = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const energyUsage = await energyUsageService.energyUsageByCategory(
      dateUtil.stringToDate(req.query.from_date),
      dateUtil.stringToDate(req.query.to_date),
    );

    res.send(energyUsage);
  } catch (e) {
    next(e);
  }
};

const getEnergyUsageBySlug = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result:IUsage[] = await bySlug(
      req.params.slug,
      energyUsageService.energyUsageByIds,
      req.query.from_date,
      req.query.to_date,
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle finding average energy for slug.
 * Slug can be either a specific building or a specific category.
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getAverageEnergyBySlug = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: number = await bySlug(
      req.params.slug,
      energyAverageService.averageByYearForBuildings,
      req.query.from_date,
      req.query.to_date,
    );
    res.send({ averageEnergy: result });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle finding average energy for all categories, grouped by category.
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getAverageEnergy = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const energyAverage: IEnergyAverageByCategory[] = await
    energyAverageService.averageByYearForCategories(
      dateUtil.stringToDate(req.query.from_date),
      dateUtil.stringToDate(req.query.to_date),
    );

    res.send(energyAverage);
  } catch (e) {
    next(e);
  }
};

const getSavedEnergy = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await Category.find();

    const responses: IEnergySaved[] = await Promise.all(categories.map(
      async (category: ICategory) => {
        const enregySaved = await metricsService.energyUsedLastTwoYearsByCategory(
          category._id,
          dateUtil.latestDateInDataset(), // This is for prototyping only to match data in dataset
        );

        const percentEnergySaved = metricsService.calculatePercentageSaved(
          enregySaved.energyUsedCurrentYear, enregySaved.energyUsedLastYear,
        );

        return {
          category,
          saved: percentEnergySaved,
        };
      },
    ));

    res.send(responses);
  } catch (err) {
    next(err);
  }
};

export default {
  getEnergyCarriers,
  getCarriersBySlug,
  getTotalEnergyBySlug,
  getTotalEnergy,
  getEnergyUsage,
  getEnergyUsageBySlug,
  getAverageEnergyBySlug,
  getAverageEnergy,
  getSavedEnergy,
};
