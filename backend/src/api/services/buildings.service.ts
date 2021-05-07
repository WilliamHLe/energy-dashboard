import Building, { IBuilding } from '../models/buildings.model';
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
    {
      $project: {
        _id: 0,
      },
    },
  ];

  return Building.aggregate(query);
};

/**
 * Finds a building by case insensitive name
 * @param {string} name - The name of the building
 * @returns {IBuilding | null} - The building if found, else null
 */
const findBuildingByName = async (name: string): Promise<IBuilding | null> => {
  const regEx: RegExp = new RegExp(name, 'i');
  return Building.findOne({ name: { $regex: regEx } });
};

/**
 * Finds all buildings matching a (partial) case insenstive name
 * @param {string} name - The (partial) name of the building(s)
 * @returns {IBuilding[]} - The buildings matching the name, empty array if none found
 */
const findBuildingsByPartialName = async (name: string): Promise<IBuilding[]> => {
  const regEx: RegExp = new RegExp(name, 'i');
  return Building.find({ name: { $regex: regEx } });
};

export default {
  buildingsGroupedByCategory,
  findBuildingByName,
  findBuildingsByPartialName,
};
