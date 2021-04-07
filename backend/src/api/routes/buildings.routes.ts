import express from 'express';

import controllers from '../controllers/buildings.controllers';

const router = express.Router();

router.get('/', controllers.getAllBuildings);
router.get('/:id', controllers.getBuildingById);

export default router;
