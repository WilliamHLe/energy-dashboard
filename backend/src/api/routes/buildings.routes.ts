import express from 'express';

import energyControllers from '../controllers/energy.controllers';
import controllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', controllers.getAllBuildings);
router.get('/:id', controllers.getBuildingById);
router.get('/:id/energy/carriers', energyControllers.carriersByBuildingId);
<<<<<<< HEAD
router.get('/:id/energy/total', energyControllers.getTotalEnergyByBuilding);
=======
router.get('/:id/energy/total', controllers.getTotalEnergyByBuilding);
>>>>>>> #147 add strong typing, delete extra building files

export default router;
