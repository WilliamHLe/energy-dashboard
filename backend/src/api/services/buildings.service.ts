import { ICategory } from '../models/categories.model';
import Building from '../models/buildings.model';

export interface BuildingCategory {
  category: ICategory,
  buildings: string[]
}

/**
 * Groups buildings by id into categories
 * @returns {BuildingCategory[]} A list of categories and their associated buildings
 */
const getBuildingsGroupedByCategory = async (): Promise<BuildingCategory[]> => {
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
  getBuildingsGroupedByCategory,
};
