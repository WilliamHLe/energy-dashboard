import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Sensors from '../models/sensors.model';

const getTotalEnergyBuilding = async (req: Request, res: Response, next: NextFunction) => {
  const buildingId = mongoose.Types.ObjectId(req.params.id);
  const fromDate = `${new Date(req.query.from_date as string).toISOString().split('.')[0]}0Z`;
  // const toDate = req.query.to_date;

  const buildings = await Sensors.find({
    building: buildingId,
    unit_of_measurement: 'kWh',
  }).select({
    measurements: {
      $filter: {
        input: '$measurements',
        as: 'measurement',
        cond: {
          $gte: ['$$measurement.date', fromDate],
          // $lte: [ "$$measurement.date", new Date(toDate as string).toISOString() ]
        },
      },
    },
  });

  const totalEnergyBuilding = () => {
    let energy = 0;
    for (let i = 0; i < buildings.length; i += 1) {
      for (let j = 0; j < buildings[i].measurements.length; j += 1) {
        energy += buildings[i].measurements[j].measurement;
      }
    }
    return energy;
  };

  if (buildings) {
    res.json({
      total: totalEnergyBuilding(),
      // buildings
    });
  } else {
    next('Unable to retrieve measurement');
  }
};

export default {
  getTotalEnergyBuilding,
};
