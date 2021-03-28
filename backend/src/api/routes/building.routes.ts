import express from 'express';

const buildingController = require('../controllers/buildingController');

const router = express.Router();

router.get('/:id/energy/total', buildingController.getTotalEnergyBuilding);

module.exports = router;
