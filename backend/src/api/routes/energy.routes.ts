import express from 'express';

import energyController from '../controllers/energy.controllers';
import buildingControllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/carriers', energyController.getEnergyCarriers);
router.get('/carriers/:slug', energyController.getCarriersBySlug);
router.get('/usage', energyController.getEnergyUsage);
router.get('/usage/:slug', energyController.getEnergyUsageBySlug);
router.get('/total/', energyController.getTotalEnergy);
router.get('/total/:slug', energyController.getTotalEnergyBySlug);
router.get('/average/:slug', energyController.getAverageEnergyBySlug);
router.get('/average', energyController.getAverageEnergy);
router.get('/saved/weekly/:slug', buildingControllers.getSavedEnergyWeeklyByName);
router.get('/saved/total/:slug', buildingControllers.getSavedEnergyByName);
router.get('/saved', energyController.getSavedEnergy);

export default router;
