import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../api-documentation/swagger.json';
import categoryRoutes from './api/routes/categories.routes';
import connectDb from './util/database';
import searchRoute from './api/routes/search.routes';

connectDb();

const app = express();
const port = 3000;

app.use('/buildings', buildingRoute);
app.use('/search', searchRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/categories', categoryRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${port}`);
});
