import { Request, Response, NextFunction } from 'express';
import Building from '../models/buildings.model';

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

export default {
  getAllBuildings,
  getBuildingById,
};
