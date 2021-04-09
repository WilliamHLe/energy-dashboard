import mongoose from 'mongoose';
import Sensor from '../models/sensors.model';

const sumEnergyUsage = async (
  buildingId?: mongoose.Types.ObjectId, fromDate?: string, toDate?: string,
): Promise<number> => {
  const query = [
    {
      $match: {
        type: 'ForbruksmÃ¥ler',
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
    {
      $project: {
        _id: 0,
        total: 1,
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

  if (buildingId) {
    const match = {
      $match: {
        building: buildingId,
        type: 'ForbruksmÃ¥ler',
      },
    };

    query.splice(0, 1, match);
  }

  const results = await Sensor.aggregate(query);
  return results[0];
};

const sumEnergyUsageBySlug = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<number> => {
  const query = [
    {
      $match: {
        building: { $in: buildingIds.map((id) => mongoose.Types.ObjectId(id)) },
        type: 'ForbruksmÃ¥ler',
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
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ];

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

  const results = await Sensor.aggregate(query);
  return results[0];
};

export default {
  sumEnergyUsage,
  sumEnergyUsageBySlug,
};
