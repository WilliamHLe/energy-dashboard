import express from 'express';

import metricsControllers from '../controllers/metrics.controllers';

const router = express.Router();

router.get('/', metricsControllers.metrics);
router.get('/:slug', metricsControllers.metricsBySlug);

export default router;
