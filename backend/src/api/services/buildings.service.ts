import mongoose from 'mongoose';
import Sensors from '../models/sensors.model';

const sumEnergyUsage = async (
  buildingId?: mongoose.Types.ObjectId, fromDate?: string, toDate?: string,
): Promise<any> => {
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
    const match: any = {
      $match: {
        building: buildingId,
        type: 'ForbruksmÃ¥ler',
      },
    };

    query.splice(0, 1, match);
  }

  const results = await Sensors.aggregate(query);
  return results;
};

/* const sumEnergyUsageBySlug = async (
  buildingIds: string[], fromDate?: string, toDate?: string,
): Promise<any> => {
  let query: object[] = [
    {

    }
  ]
}; */

export default {
  sumEnergyUsage,
  // sumEnergyUsageBySlug,
};
