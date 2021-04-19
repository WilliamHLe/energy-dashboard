import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../api-documentation/swagger.json';
import categoryRoutes from './api/routes/categories.routes';
import searchRoute from './api/routes/search.routes';
import metricRoutes from './api/routes/metrics.routes';
import energyRoutes from './api/routes/energy.routes';
import buildingRoutes from './api/routes/buildings.routes';
import connectDb from './util/database';
import highscoresRoutes from './api/routes/highscores.routes';

connectDb();

const app = express();
const port = 3000;

app.use('/search', searchRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/categories', categoryRoutes);
app.use('/metrics', metricRoutes);
app.use('/energy', energyRoutes);
app.use('/buildings', buildingRoutes);
app.use('/highscores', highscoresRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${port}`);
});
