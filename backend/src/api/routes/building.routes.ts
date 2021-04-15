import express from 'express';

import buildingController from '../controllers/building.controllers';

const router = express.Router();

router.get('/:id/energy/total', buildingController.getTotalEnergyByBuilding);

export default router;
