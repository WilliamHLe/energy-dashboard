import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Building, { IBuilding } from '../models/buildings.model';
import energyService from '../services/energy.service';
import { Carrier } from '../../types/interfaces';

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

const getSavedWeeklyByBuildingName = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });

    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energyService.getSavedWeeklyByBuilding(building));
  } catch (e) {
    next(e);
  }
};

const getSavedWeeklyByBuildingId = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energyService.getSavedWeeklyByBuilding(building));
  } catch (e) {
    next(e);
  }
};

const getSavedByBuildingName = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const name: RegExp = new RegExp(req.params.slug, 'i');
    const building: IBuilding | null = await Building.findOne({ name: { $regex: name } });

    if (!building) {
      next('Building not found');
      return;
    }

    const saved = await energyService.getSavedEnergyByBuilding(building);

    res.send({
      percentSaved: saved,
    });
  } catch (e) {
    next(e);
  }
};

const getSavedByBuildingId = async (
  req: Request, res: Response, next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    const saved = await energyService.getSavedEnergyByBuilding(building);

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

export default {
  getAllBuildings,
  getBuildingById,
  getTotalEnergyByBuilding,
  getSavedByBuildingId,
  getSavedByBuildingName,
  getSavedWeeklyByBuildingName,
  getSavedWeeklyByBuildingId,
  carriersByBuildingId,
  getEnergyUsageByBuilding,
  getAverageUsageByBuilding,
};
