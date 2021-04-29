import express from 'express';

import metricsControllers from '../controllers/metrics.controllers';
import buildingControllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', buildingControllers.getAllBuildings);
router.get('/:id', buildingControllers.getBuildingById);
router.get('/:id/metrics', metricsControllers.getMetricsByBuildingId);
router.get('/:id/energy/carriers', buildingControllers.getCarriersById);
router.get('/:id/energy/total', buildingControllers.getTotalEnergyById);
router.get('/:id/energy/saved/weekly', buildingControllers.getSavedEnergyWeeklyById);
router.get('/:id/energy/saved/total', buildingControllers.getSavedEnergyById);
router.get('/:id/energy/usage', buildingControllers.getEnergyUsageById);
router.get('/:id/energy/average', buildingControllers.getAverageUsageById);

export default router;
