import express from 'express';

import energyController from '../controllers/energy.controllers';
<<<<<<< HEAD
=======
import buildingController from '../controllers/buildings.controllers';
>>>>>>> #147 add strong typing, delete extra building files

const router = express.Router();

router.get('/carriers', energyController.carriers);
router.get('/carriers/:slug', energyController.carriersBySlug);
router.get('/usage', energyController.getEnergyUsage);
router.get('/total/', energyController.getTotalEnergy);
router.get('/total/:slug', energyController.getTotalEnergyBySlug);
router.get('/average/:slug', energyController.getAverageEnergyBySlug);
router.get('/average', energyController.getAllAverage);

export default router;
