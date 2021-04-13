import express from 'express';

import controllers from '../controllers/categories.controllers';

const router = express.Router();

router.get('/', controllers.getAllCategories);
router.get('/:name', controllers.getCategoryByName);

export default router;
