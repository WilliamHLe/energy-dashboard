import express from 'express';

import categoryControllers from '../controllers/categories.controllers';
import metricsControllers from '../controllers/metrics.controllers';
import energyControllers from '../controllers/energy.controllers';
import highscoresControllers from '../controllers/highscores.controllers';

const router = express.Router();

router.get('/', categoryControllers.getAllCategories);
router.get('/:name', categoryControllers.getCategoryByName);
router.get('/:name/metrics', metricsControllers.metricsByCategoryName);
router.get('/:slug/energy/total', energyControllers.getTotalEnergyBySlug);
router.get('/:slug/highscores', highscoresControllers.getHighscoresForCategory);
router.get('/:slug/energy/usage', energyControllers.getEnergyUsageBySlug);
router.get('/:slug/energy/average', energyControllers.getAverageEnergyBySlug);
router.get('/:slug/energy/carriers', energyControllers.getCarriersBySlug);

export default router;
