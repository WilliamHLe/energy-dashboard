import express from 'express';

import energyController from '../controllers/energy.controllers';

const router = express.Router();

router.get('/carriers', energyController.carriers);
router.get('/carriers/:slug', energyController.carriersBySlug);
router.get('/usage', energyController.getEnergyUsage);
router.get('/total/', energyController.getTotalEnergy);
router.get('/total/:slug', energyController.getTotalEnergyBySlug);
router.get('/average/:slug', energyController.getAverageEnergyBySlug);
router.get('/average', energyController.getAllAverage);
router.get('/saved/weekly/:slug', energyController.getSavedWeeklyByBuildingName);
router.get('/saved/total/:slug', energyController.getSavedByBuildingName);

export default router;
