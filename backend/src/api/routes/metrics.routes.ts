import express from 'express';

import metricsControllers from '../controllers/metrics.controllers';

const router = express.Router();

router.get('/', metricsControllers.getMetrics);
router.get('/:slug', metricsControllers.getMetricsBySlug);

export default router;
