import { Request, Response, NextFunction } from 'express';
import { IBuildingScore } from '../../types/interfaces';
import { ICategory } from '../models/categories.model';
import highscoreService from '../services/highscore.service';
import dateUtil from '../../util/date';
import categoryService from '../services/category.service';

const getHighscoresForCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { slug } = req.params;
    const category: ICategory | null = await categoryService.findCategoryByName(slug);

    if (!category) {
      next('no category found');
      return;
    }

    const scores: IBuildingScore[] = await highscoreService.highscoresByCategory(
      category._id,
      dateUtil.latestDateInDataset(),
    );

    res.send(scores);
  } catch (err) {
    next(err);
  }
};

export default {
  getHighscoresForCategory,
};
