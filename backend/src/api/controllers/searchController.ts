import { Request, Response, NextFunction } from 'express';
import Building from '../models/buildings.model';

const searchBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const buildingName: string = req.query.name as string;
  const regex: RegExp = new RegExp(buildingName, 'i');
  const buildings = await Building.find({
    name: {
      $regex: regex,
    },
  });
  if (buildings) {
    res.send(buildings);
  } else {
    next('Unable to find building');
  }
};

export default {
  searchBuilding,
};
