import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import buildingsService from '../services/buildings.service';
import Building, { IBuilding } from '../models/buildings.model';

const getTotalEnergyBuilding = async (req: Request, res: Response, next: NextFunction) => {
  const buildingId = mongoose.Types.ObjectId(req.params.id);
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

const getTotalEnergyBuildingBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const { slug } = req.params;

  try {
    const building: IBuilding | null = await Building.findOne({ name: slug });
    if (building) {
      const buildings = await buildingsService.sumEnergyUsage(building.id, fromDate, toDate);
      res.send(buildings[0]);
    }
  } catch (e) {
    next(e);
  }
};

export default {
  getTotalEnergyBuilding,
  getTotalEnergyBuildingBySlug,
};
