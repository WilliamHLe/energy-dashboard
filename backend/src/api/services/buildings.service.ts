import Building from '../models/buildings.model';
import { IBuildingCategory } from '../../types/interfaces';

/**
 * Groups buildings by id into categories
 * @returns {IBuildingCategory[]} A list of categories and their associated buildings
 */
const buildingsGroupedByCategory = async (): Promise<IBuildingCategory[]> => {
  const query = [
    {
      $group: {
        _id: '$category',
        buildings: { $push: '$_id' },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
  ];

  return Building.aggregate(query);
};

export default {
  buildingsGroupedByCategory,
};
