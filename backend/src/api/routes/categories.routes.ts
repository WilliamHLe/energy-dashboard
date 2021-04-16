import express from 'express';

import controllers from '../controllers/categories.controllers';
<<<<<<< HEAD
import energyControllers from '../controllers/energy.controllers';
=======
import buildingController from '../controllers/buildings.controllers';
>>>>>>> #147 add strong typing, delete extra building files

const router = express.Router();

router.get('/', controllers.getAllCategories);
router.get('/:name', controllers.getCategoryByName);
router.get('/:slug/energy/total', energyControllers.getTotalEnergyBySlug);

export default router;
