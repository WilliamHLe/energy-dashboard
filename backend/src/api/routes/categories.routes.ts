import express from 'express';

import controllers from '../controllers/categories.controllers';
import energyControllers from '../controllers/energy.controllers';

const router = express.Router();

router.get('/', controllers.getAllCategories);
router.get('/:name', controllers.getCategoryByName);
router.get('/:slug/energy/total', energyControllers.getTotalEnergyBySlug);
router.get('/:slug/energy/usage', energyControllers.getEnergyUsageBySlug);

export default router;
