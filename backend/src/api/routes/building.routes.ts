import express from 'express';

import buildingController from '../controllers/buildingController';

const router = express.Router();

router.get('/:id/energy/total', buildingController.getTotalEnergyBuilding);

export default router;
