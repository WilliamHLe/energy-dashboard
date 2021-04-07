import Sensors from '../models/sensors.model';

const sumEnergyUsage = async (buildingId: any, fromDate: string, toDate: string): Promise<any> => {
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
  const results = await Sensors.aggregate(query);
  return results;
};

export default {
  sumEnergyUsage,
};
