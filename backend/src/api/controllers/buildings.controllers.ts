import { Request, Response, NextFunction } from 'express';
import Building, { IBuilding } from '../models/buildings.model';
import energyCarriersService from '../services/energyCarriers.service';
import { ICarrier } from '../../types/interfaces';
import energyUsageService from '../services/energyUsage.service';
import energySavedService from '../services/energySaved.service';
import energyAverageService from '../services/energyAverage.service';
import buildingsService from '../services/buildings.service';
import dateUtil from '../../util/date';
import { ReqQueryDate } from '../../types/types';

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
    const building = await Building.findById({
      _id: req.params.id,
    }).populate('category').lean();
    res.send(building);
  } catch (err) {
    next(err);
  }
};

const getSavedEnergyWeeklyByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const building: IBuilding | null = await buildingsService.findBuildingByName(req.params.slug);
    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energySavedService.savedWeeklyByBuilding(
      building,
      dateUtil.latestDateInDataset(),
    ));
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyWeeklyById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    res.send(await energySavedService.savedWeeklyByBuilding(
      building,
      dateUtil.latestDateInDataset(),
    ));
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const building: IBuilding | null = await buildingsService.findBuildingByName(
      req.params.slug,
    );

    if (!building) {
      next('Building not found');
      return;
    }
    const saved = await energySavedService.savedEnergyByBuilding(
      building,
      dateUtil.latestDateInDataset(),
    );

    res.send({
      percentSaved: saved,
    });
  } catch (e) {
    next(e);
  }
};

const getSavedEnergyById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const building: IBuilding | null = await Building.findById(id);

    if (!building) {
      next('Building not found');
      return;
    }

    const saved = await energySavedService.savedEnergyByBuilding(
      building, dateUtil.latestDateInDataset(),
    );

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
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fromDate, toDate } = dateUtil.parseDates(
      req.query.from_date, req.query.to_date,
    );
    const carriers: ICarrier[] = await energyCarriersService.carriersByBuildings(
      [req.params.id], fromDate, toDate,
    );

    res.send(carriers);
  } catch (err) {
    next(err);
  }
};

const getEnergyUsageById = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fromDate, toDate } = dateUtil.parseDates(
      req.query.from_date, req.query.to_date,
    );

    const energyUsage = await energyUsageService.energyUsageByIds(
      [req.params.id], fromDate, toDate,
    );

    res.send(energyUsage);
  } catch (err) {
    next(err);
  }
};

// Get total energy by building ID
const getTotalEnergyById = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fromDate, toDate } = dateUtil.parseDates(
      req.query.from_date, req.query.to_date,
    );
    const totalEnergy: number = await energyUsageService.sumEnergyUsageByIds(
      [req.params.id], fromDate, toDate,
    );
    res.send({ total: totalEnergy });
  } catch (e) {
    next(e);
  }
};

const getAverageUsageById = async (
  req: Request<any, any, any, ReqQueryDate>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fromDate, toDate } = dateUtil.parseDates(
      req.query.from_date, req.query.to_date,
    );
    const energyUsage = await energyAverageService.energyAverageBySlug(
      [req.params.id], fromDate, toDate,
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
