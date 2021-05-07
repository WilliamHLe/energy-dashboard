import { Request, Response, NextFunction } from 'express';
import buildingsService from '../services/buildings.service';
import { ReqQuerySearch } from '../../types/types';

const searchBuilding = async (
  req: Request<any, any, any, ReqQuerySearch>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const buildings = await buildingsService.findBuildingsByPartialName(req.query.name);
  if (buildings) {
    res.send(buildings);
  } else {
    next('Unable to find building');
  }
};

export default {
  searchBuilding,
};
