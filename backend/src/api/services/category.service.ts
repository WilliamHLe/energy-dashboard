import Category, { ICategory } from '../models/categories.model';

/**
 * Finds a category by case insensitive name
 * @param {string} name - The name of the category
 * @returns {IBuilding | null} - The category if found, else null
 */
const findCategoryByName = async (name: string): Promise<ICategory | null> => {
  const regex: RegExp = new RegExp(name, 'i');
  return Category.findOne({ name: { $regex: regex } });
};

export default {
  findCategoryByName,
};
