import express from 'express';

import buildingController from '../controllers/buildingController';

const router = express.Router();

// router.get('/total/:slug', buildingController.getTotalEnergyBySlug);
router.get('/total/', buildingController.getTotalEnergyByBuilding);

export default router;
