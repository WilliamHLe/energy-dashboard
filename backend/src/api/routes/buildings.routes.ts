import express from 'express';

import energyControllers from '../controllers/energy.controllers';
import controllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', controllers.getAllBuildings);
router.get('/:id', controllers.getBuildingById);
router.get('/:id/energy/carriers', energyControllers.carriersByBuildingId);
router.get('/:id/energy/total', controllers.getTotalEnergyByBuilding);

export default router;
