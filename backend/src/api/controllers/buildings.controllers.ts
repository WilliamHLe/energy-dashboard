import { Request, Response, NextFunction } from 'express';
import Building, { IBuilding } from '../models/buildings.model';
import energyCarriersService from '../services/energyCarriers.service';
import { ICarrier } from '../../types/interfaces';
import energyUsageService from '../services/energyUsage.service';
import energySavedService from '../services/energySaved.service';
import energyAverageService from '../services/energyAverage.service';

const getAllBuildings = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categoryId: string | undefined = req.query.category as string;
    let buildings;

    if (categoryId) {
      buildings = await Building.find({ category: categoryId }).populate('category').lean();
    } else {
      buildings = await Building.find().populate('category').lean();
    }

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
    }).populate('category').lean();
    res.send(building);
  } catch (err) {
    next(err);
  }
};

const getSavedEnergyWeeklyByName = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });

    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energySavedService.savedWeeklyByBuilding(building));
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyWeeklyById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energySavedService.savedWeeklyByBuilding(building));
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyByName = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });

    if (!building) {
      next('Building not found');
      return;
    }

    const saved = await energySavedService.savedEnergyByBuilding(building);

    res.send({
      percentSaved: saved,
    });
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    const saved = await energySavedService.savedEnergyByBuilding(building);

    res.send({
      percentSaved: saved,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller to handle finding carriers for a single building based on the building id.
 * @param {Request} req - Express request. Should contain an id.
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next function
 */
const getCarriersById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const carriers: ICarrier[] = await energyCarriersService.carriersByBuildings(
      [req.params.id], req.query.from_date as string, req.query.to_date as string,
    );

    res.send(carriers);
  } catch (err) {
    next(err);
  }
};

const getEnergyUsageById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id;

  try {
    const energyUsage = await energyUsageService.energyUsageByIds([buildingId], fromDate, toDate);

    res.send(energyUsage);
  } catch (err) {
    next(err);
  }
};

// Get total energy by building ID
const getTotalEnergyById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id as string;

  try {
    const totalEnergy: number = await energyUsageService.sumEnergyUsageByIds(
      [buildingId], fromDate, toDate,
    );
    if (totalEnergy) {
      res.send({ total: totalEnergy });
    }
  } catch (e) {
    next(e);
  }
};

const getAverageUsageById = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  const fromDate = req.query.from_date as string;
  const toDate = req.query.to_date as string;
  const buildingId = req.params.id;

  try {
    const energyUsage = await energyAverageService.energyAverageBySlug(
      [buildingId], fromDate, toDate,
    );

    res.send(energyUsage);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBuildings,
  getBuildingById,
  getTotalEnergyById,
  getSavedEnergyById,
  getSavedEnergyByName,
  getSavedEnergyWeeklyByName,
  getSavedEnergyWeeklyById,
  getCarriersById,
  getEnergyUsageById,
  getAverageUsageById,
};
