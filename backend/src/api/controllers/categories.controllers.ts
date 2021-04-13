import { Request, Response, NextFunction } from 'express';
import Category from '../models/categories.model';

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
    const building = await Category.findOne({
      name: req.params.name.toLowerCase(),
    });
    res.send(building);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCategories,
  getCategoryByName,
};
