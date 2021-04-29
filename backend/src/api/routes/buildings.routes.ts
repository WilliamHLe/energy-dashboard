import express from 'express';

import metricsControllers from '../controllers/metrics.controllers';
import buildingControllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', buildingControllers.getAllBuildings);
router.get('/:id', buildingControllers.getBuildingById);
router.get('/:id/metrics', metricsControllers.metricsByBuildingId);
router.get('/:id/energy/carriers', buildingControllers.carriersByBuildingId);
router.get('/:id/energy/total', buildingControllers.getTotalEnergyByBuilding);
router.get('/:id/energy/saved/weekly', buildingControllers.getSavedWeeklyByBuildingId);
router.get('/:id/energy/saved/total', buildingControllers.getSavedByBuildingId);
router.get('/:id/energy/usage', buildingControllers.getEnergyUsageByBuilding);
router.get('/:id/energy/average', buildingControllers.getAverageUsageByBuilding);

export default router;
