import express from 'express';

import buildingController from '../controllers/building.controllers';

const router = express.Router();

router.get('/total/', buildingController.getTotalEnergy);
router.get('/total/:slug', buildingController.getTotalEnergyBySlug);

export default router;
