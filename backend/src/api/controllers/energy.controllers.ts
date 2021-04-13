import { Request, Response, NextFunction } from 'express';
import Building, { IBuilding } from '../models/buildings.model';
import Category, { ICategory } from '../models/categories.model';
import energyService, { Carrier, CarrierCategory } from '../services/energy.service';

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

export default {
  carriers,
  carriersBySlug,
  carriersByBuildingId,
};
