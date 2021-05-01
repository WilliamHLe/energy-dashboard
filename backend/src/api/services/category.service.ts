import Category, { ICategory } from '../models/categories.model';

const findCategoryByName = async (name:string): Promise<ICategory | null> => {
  const regex: RegExp = new RegExp(name, 'i');
  return Category.findOne({ name: { $regex: regex } });
};

export default {
  findCategoryByName,
};
