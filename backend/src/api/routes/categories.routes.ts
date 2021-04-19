import express from 'express';

import controllers from '../controllers/categories.controllers';
import metricsControllers from '../controllers/metrics.controllers';
import energyControllers from '../controllers/energy.controllers';
import highscoresControllers from '../controllers/highscores.controllers';

const router = express.Router();

router.get('/', controllers.getAllCategories);
router.get('/:name', controllers.getCategoryByName);
router.get('/:name/metrics', metricsControllers.metricsByCategoryName);
router.get('/:slug/energy/total', energyControllers.getTotalEnergyBySlug);
router.get('/:slug/highscores', highscoresControllers.getHighscoresForCategory);
router.get('/:slug/energy/usage', energyControllers.getEnergyUsageBySlug);

export default router;
