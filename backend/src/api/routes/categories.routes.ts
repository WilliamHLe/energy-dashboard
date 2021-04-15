import express from 'express';

import controllers from '../controllers/categories.controllers';
import buildingController from '../controllers/building.controllers';

const router = express.Router();

router.get('/', controllers.getAllCategories);
router.get('/:name', controllers.getCategoryByName);
router.get('/:slug/energy/total', buildingController.getTotalEnergyBySlug);

export default router;
