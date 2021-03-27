import express from 'express';

const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/', searchController.searchBuilding);

module.exports = router;
