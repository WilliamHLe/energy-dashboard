import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../api-documentation/swagger.json';

const searchRoute = require('./api/routes/search.routes.ts');
const buildingRoute = require('./api/routes/building.routes.ts');

// Example mongodb connection
if (process.env.DB_HOST && process.env.DB_DATABASE) { // TODO: Add username/password
  mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Failed connecting database:'));
  db.once('open', () => console.log('Connected to database'));
} else {
  console.log('Running without database connection.');
}

// Example express server
const app = express();
const port = 3000;

app.use('/buildings', buildingRoute);
app.use('/search', searchRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.send(`DB_HOST${process.env.DB_HOST}`);
});

app.listen(port, () => {
  console.log(`express is listening on port ${port}`);
});
