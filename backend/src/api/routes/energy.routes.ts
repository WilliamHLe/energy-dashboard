import express from 'express';

import energyController from '../controllers/energy.controllers';

const router = express.Router();

router.get('/carriers', energyController.carriers);
router.get('/carriers/:slug', energyController.carriersBySlug);
router.get('/usage', energyController.getEnergyUsage);

export default router;
