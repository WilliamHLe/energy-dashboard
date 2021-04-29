import { Request, Response, NextFunction } from 'express';
import {
  Carrier, CarrierCategory, EnergyAverage, EnergyAverageByCategory, IEnergySaved,
} from '../../types/interfaces';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyService from '../services/energy.service';
import metricsService from '../services/metrics.service';

/**
 * Controller to handle fetching carriers for both categories and buildings by name. This is
 * done by first checking if the given req.params.slug is a category or building. If it is a
 * category the buildings of that category are found and used. The buildings are then sent to
 * the service which calculates the carrier usage of the building(s).
 * @param {Request} req - Express request. Should contain a slug.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const carriersBySlug = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const category: ICategory | null = await Category.findOne({ name: { $regex: name } });

    if (category) {
      const buildings = await Building.find({ category: category.id }).distinct('_id');
      const carriers: Carrier[] = await energyService.carriersByBuildings(
        buildings, req.query.from_date as string, req.query.to_date as string,
      );

      res.send(carriers);
    } else {
      const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });
      if (building) {
        const carriers: Carrier[] = await energyService.carriersByBuildings(
          [building.id], req.query.from_date as string, req.query.to_date as string,
        );

        res.send(carriers);
      } else {
        // The slug did not contain a category or building name
        next('Invalid slug');
      }
    }
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
const carriers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const results: CarrierCategory[] = await energyService.carriers(
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
    const totalEnergy = await energyService.sumEnergyUsageByCategory(
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
  const slug = req.params.slug as string;

  try {
    const category: ICategory | null = await Category.findOne({ name: slug });

    if (category) {
      const buildings: string[] = await Building.find({ category: category.id }).distinct('_id');
      const totalEnergy: number = await energyService.sumEnergyUsageByBuildingIds(
        buildings, fromDate, toDate,
      );

      res.send({
        total: totalEnergy,
      });
    } else {
      const regex: RegExp = new RegExp(slug, 'i');
      const building: IBuilding | null = await Building.findOne({ name: { $regex: regex } });

      if (building) {
        const totalEnergy: number = await energyService.sumEnergyUsageByBuildingIds(
          [building.id], fromDate, toDate,
        );

        res.send({
          total: totalEnergy,
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

// Get time series energy usage of each building category
const getEnergyUsage = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const energyUsage = await energyService.energyUsageByCategory(
      fromDate, toDate,
    );

    res.send(energyUsage);
  } catch (e) {
    next(e);
  }
};

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

const getEnergyUsageBySlug = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const result = await bySlug(req.params.slug, energyService.energyUsage, fromDate, toDate);
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
  const slug = req.params.slug as string;

  try {
    const category: ICategory | null = await Category.findOne({ name: slug });

    if (category) {
      const buildings: string[] = await Building.find({ category: category.id }).distinct('_id');
      const averageEnergy: EnergyAverage[] = await energyService.energyAverageBySlug(
        buildings, fromDate, toDate,
      );

      res.send({
        averageEnergy,
      });
    } else {
      const regex: RegExp = new RegExp(slug, 'i');
      const building: IBuilding | null = await Building.findOne({ name: { $regex: regex } });

      if (building) {
        const averageEnergy: EnergyAverage[] = await energyService.energyAverageBySlug(
          [building.id], fromDate, toDate,
        );

        res.send({
          averageEnergy,
        });
      }
    }
  } catch (e) {
    next(e);
  }
};

/**
 * Controller to handle finding average energy for all categories, grouped by category.
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getAllAverage = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const energyAverage: EnergyAverageByCategory[] = await
    energyService.energyAverageGroupedByCategory(
      fromDate, toDate,
    );

    res.send(energyAverage);
  } catch (e) {
    next(e);
  }
};

const getAllSaved = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();

    const responses: IEnergySaved[] = await Promise.all(categories.map(
      async (category: ICategory) => {
        const enregySaved = await metricsService.energyUsageTwoLastYearsByBuildings(category._id);
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
  carriers,
  carriersBySlug,
  getTotalEnergyBySlug,
  getTotalEnergy,
  getEnergyUsage,
  getEnergyUsageBySlug,
  getAverageEnergyBySlug,
  getAllAverage,
  getAllSaved,
};
