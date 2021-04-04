import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Sensors from '../models/sensors.model';

const getTotalEnergyBuilding = async (req: Request, res: Response, next: NextFunction) => {
  const buildingId = mongoose.Types.ObjectId(req.params.id);
  const fromDate = req.query.from_date;
  const toDate = req.query.to_date;

  const query = [
    {
      $match: {
        building: buildingId,
        unit_of_measurement: 'kWh',
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: { $sum: '$measurements.measurement' },
        },
      },
    },
  ];

  // Check if query parameter fromDate or toDate exists, if yes add filter query
  if (fromDate || toDate) {
    const filter: any = {
      $project: {
        measurements: {
          $filter: {
            input: '$measurements',
            as: 'measurement',
            cond: {
              $and: [
                fromDate ? { $gte: ['$$measurement.date', new Date(fromDate as string)] } : {},
                toDate ? { $lte: ['$$measurement.date', new Date(toDate as string)] } : {},
              ],
            },
          },
        },
      },
    };

    query.splice(1, 0, filter);
  }

  const buildings = await Sensors.aggregate(query);

  if (buildings) {
    res.send(buildings[0]);
  } else {
    next('Unable to retrieve measurement');
  }
};

export default {
  getTotalEnergyBuilding,
};
