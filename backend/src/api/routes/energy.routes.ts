import express from 'express';

import energyController from '../controllers/energy.controllers';
import buildingController from '../controllers/building.controllers';

const router = express.Router();

router.get('/carriers', energyController.carriers);
router.get('/carriers/:slug', energyController.carriersBySlug);
router.get('/usage', energyController.getEnergyUsage);
router.get('/total/', buildingController.getTotalEnergy);
router.get('/total/:slug', buildingController.getTotalEnergyBySlug);

export default router;
