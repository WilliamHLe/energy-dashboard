import express from 'express';

import buildingController from '../controllers/buildingController';

const router = express.Router();

router.get('/total/', buildingController.getTotalEnergyByBuilding);
router.get('/total/:slug', buildingController.getTotalEnergyBySlug);

export default router;
