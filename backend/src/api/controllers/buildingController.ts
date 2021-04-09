import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import buildingsService from '../services/buildings.service';
// import Building, { IBuilding } from '../models/buildings.model';
// import Category, { ICategory } from '../models/categories.model';

/*
  This will return total energy for a specific buildingId or
  all buildings if no buildingId is defined
*/
const getTotalEnergyByBuilding = async (req: Request, res: Response, next: NextFunction) => {
  const buildingId = req.params.id ? mongoose.Types.ObjectId(req.params.id) : undefined;
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const buildings = await buildingsService.sumEnergyUsage(buildingId, fromDate, toDate);
    if (buildings) {
      res.send(buildings[0]);
    }
  } catch (e) {
    next(e);
  }
};

/* const getTotalEnergyBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;

  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const category: ICategory | null = await Category.findOne({ name: { $regex: name } });

    if (category) {
      const buildings = await Building.find({ category: category.id });
      const total = await buildingsService.sumEnergyUsage();

      res.send(total);
    }

  } catch (e) {
    next(e);
  }
}; */

export default {
  getTotalEnergyByBuilding,
  // getTotalEnergyBySlug,
};
