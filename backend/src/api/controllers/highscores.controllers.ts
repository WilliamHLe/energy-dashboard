import { Request, Response, NextFunction } from 'express';
import Category, { ICategory } from '../models/categories.model';
import buildingsService, { IBuildingScore } from '../services/buildings.service';

const getHighscoresForCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { slug } = req.params;
    const category: ICategory | null = await Category.findOne({ name: slug.toLowerCase() });

    if (!category) {
      next('no category found');
      return;
    }

    const scores: IBuildingScore[] = await buildingsService.getHighscoresByCategory(category._id);
    res.send(scores);
  } catch (err) {
    next(err);
  }
};

export default {
  getHighscoresForCategory,
};
