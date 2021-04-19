import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyService, {
  Carrier, CarrierCategory, EnergyAverage, EnergyAverageByCategory,
} from '../services/energy.service';
import metricsService from '../services/metrics.service';

export interface IEnergySaved {
  category: ICategory,
  saved: number,
}

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
 * Controller to handle finding carriers for a single building based on the building id.
 * @param {Request} req - Express request. Should contain an id.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const carriersByBuildingId = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const carriers: Carrier[] = await energyService.carriersByBuildings(
      [req.params.id], req.query.from_date as string, req.query.to_date as string,
    );

    res.send(carriers);
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

// Get total energy by building ID
const getTotalEnergyByBuilding = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id ? mongoose.Types.ObjectId(req.params.id) : undefined;

  try {
    const totalEnergy: number = await energyService.sumEnergyUsage(
      buildingId, fromDate, toDate,
    );
    if (totalEnergy) {
      res.send(totalEnergy);
    }
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

const getEnergyUsageByBuilding = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id;

  try {
    const energyUsage = await energyService.energyUsage([buildingId], fromDate, toDate);

    res.send(energyUsage);
  } catch (err) {
    next(err);
  }
};

const getEnergyUsageBySlug = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const category: ICategory | null = await Category.findOne({ name: { $regex: name } });

    if (category) {
      const buildings = await Building.find({ category: category.id }).distinct('_id');
      const energyUsage = await energyService.energyUsage(
        buildings, fromDate, toDate,
      );

      res.send(energyUsage);
    } else {
      const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });
      if (building) {
        const energyUsage = await energyService.energyUsage(
          [building.id], req.query.from_date as string, req.query.to_date as string,
        );

        res.send(energyUsage);
      } else {
        // The slug did not contain a category or building name
        next('Invalid slug');
      }
    }
  } catch (err) {
    next(err);
  }
};

const getAverageUsageByBuilding = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id;

  try {
    const energyUsage = await energyService.energyAverageBySlug([buildingId], fromDate, toDate);

    res.send(energyUsage);
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
  carriersByBuildingId,
  getTotalEnergyByBuilding,
  getTotalEnergyBySlug,
  getTotalEnergy,
  getEnergyUsage,
  getEnergyUsageByBuilding,
  getEnergyUsageBySlug,
  getAverageUsageByBuilding,
  getAverageEnergyBySlug,
  getAllAverage,
  getAllSaved,
};
