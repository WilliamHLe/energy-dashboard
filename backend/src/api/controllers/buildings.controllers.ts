import { Request, Response, NextFunction } from 'express';
import Building from '../models/buildings.model';

const getAllBuildings = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const buildings = await Building.find();
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
    });
    res.send(building);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBuildings,
  getBuildingById,
};
