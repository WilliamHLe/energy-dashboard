import { Request, Response, NextFunction } from 'express';
import Building from '../models/buildings.model';

const searchBuilding = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const buildingName: string = req.query.name as string;
  const regex: RegExp = new RegExp(buildingName, 'i');
  let buildings = await Building.find({
    name: {
      $regex: regex,
    },
  });
  if (buildings) {
    // Temporary fix for missing values in database
    buildings = buildings.map((building) => {
      const b = building;
      b.tek = 'TEK17';
      b.energyLabel = 'A';
      return b;
    });

    res.send(buildings);
  } else {
    next('Unable to find building');
  }
};

export default {
  searchBuilding,
};
