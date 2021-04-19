import express from 'express';

import metricsControllers from '../controllers/metrics.controllers';
import energyControllers from '../controllers/energy.controllers';
import controllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', controllers.getAllBuildings);
router.get('/:id', controllers.getBuildingById);
router.get('/:id/metrics', metricsControllers.metricsByBuildingId);
router.get('/:id/energy/carriers', energyControllers.carriersByBuildingId);
router.get('/:id/energy/total', energyControllers.getTotalEnergyByBuilding);
router.get('/:id/energy/usage', energyControllers.getEnergyUsageByBuilding);
router.get('/:id/energy/average', energyControllers.getAverageUsageByBuilding);

export default router;
