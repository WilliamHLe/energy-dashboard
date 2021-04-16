import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyService from '../services/energy.service';

const getAllBuildings = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId: string | undefined = req.query.category as string;
    let buildings;

    if (categoryId) {
      buildings = await Building.find({ category: categoryId }).lean();
    } else {
      buildings = await Building.find().lean();
    }

    // Temporary fix for missing values in database
    buildings = buildings.map((building) => {
      const b = building;
      b.tek = 'TEK17';
      b.energyLabel = 'A';
      return b;
    });

    res.send(buildings);
  } catch (err) {
    next(err);
  }
};

const getBuildingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const building = await Building.findOne({
      _id: req.params.id,
    }).lean();
    res.send(building);
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
      const totalEnergy: number = await energyService.sumEnergyUsageBySlug(
        buildings, fromDate, toDate,
      );

      res.send({
        total: totalEnergy,
      });
    } else {
      const regex: RegExp = new RegExp(slug, 'i');
      const building: IBuilding | null = await Building.findOne({ name: { $regex: regex } });

      if (building) {
        const totalEnergy: number = await energyService.sumEnergyUsageBySlug(
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

export default {
  getAllBuildings,
  getBuildingById,
  getTotalEnergy,
  getTotalEnergyByBuilding,
  getTotalEnergyBySlug,
};
