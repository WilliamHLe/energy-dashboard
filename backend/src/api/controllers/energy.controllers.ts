import { Request, Response, NextFunction } from 'express';
import {
  ICarrier, ICarrierCategory, IEnergyAverage, IEnergyAverageByCategory, IEnergySaved, IUsage,
} from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyCarriersService from '../services/energyCarriers.service';
import metricsService from '../services/metrics.service';
import energyUsageService from '../services/energyUsage.service';
import energyAverageService from '../services/energyAverage.service';

const bySlug = async (slug:string, func:Function, fromDate:string, toDate:string) => {
  const name: RegExp = new RegExp(slug, 'i');
  const category: ICategory | null = await Category.findOne({ name: { $regex: name } });
  let buildings = [];

  if (category) {
    buildings = await Building.find({ category: category.id }).distinct('_id');
  } else {
    const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });
    if (!building) {
      throw Error('Slug is invalid');
    }
    buildings = [building.id];
  }

  return func(buildings, fromDate, toDate);
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
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  try {
    const result:ICarrier[] = await bySlug(
      req.params.slug, energyCarriersService.carriersByBuildings, fromDate, toDate,
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
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const results: ICarrierCategory[] = await energyCarriersService.energyCarriers(
      req.query.from_date as string, req.query.to_date as string,
    );

    res.send(results);
  } catch (err) {
    next(err);
  }
};

// Get total energy of each building category
const getTotalEnergy = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  try {
    const totalEnergy = await energyUsageService.sumEnergyUsageByCategory(
      fromDate, toDate,
    );

    res.send(totalEnergy);
  } catch (e) {
    next(e);
  }
};

// Get total energy by category or building name
const getTotalEnergyBySlug = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  try {
    const result = await bySlug(
      req.params.slug, energyUsageService.sumEnergyUsageByBuildingIds, fromDate, toDate,
    );
    res.send({ total: result });
  } catch (err) {
    next(err);
  }
};

// Get time series energy usage of each building category
const getEnergyUsage = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const energyUsage = await energyUsageService.energyUsageByCategory(
      fromDate, toDate,
    );

    res.send(energyUsage);
  } catch (e) {
    next(e);
  }
};

const getEnergyUsageBySlug = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const result:IUsage[] = await bySlug(
      req.params.slug, energyUsageService.energyUsage, fromDate, toDate,
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
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const result:IEnergyAverage[] = await bySlug(
      req.params.slug, energyAverageService.energyAverageBySlug, fromDate, toDate,
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
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const energyAverage: IEnergyAverageByCategory[] = await
    energyAverageService.energyAverageGroupedByCategory(
      fromDate, toDate,
    );

    res.send(energyAverage);
  } catch (e) {
    next(e);
  }
};

const getSavedEnergy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();

    const responses: IEnergySaved[] = await Promise.all(categories.map(
      async (category: ICategory) => {
        const enregySaved = await metricsService.energyUsedLastTwoYearsByCategory(category._id);
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
