import { Request, Response, NextFunction } from 'express';
import Category from '../models/categories.model';
import categoryServce from '../services/category.service';

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await categoryServce.findCategoryByName(req.params.name);
    res.send(category);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCategories,
  getCategoryByName,
};
