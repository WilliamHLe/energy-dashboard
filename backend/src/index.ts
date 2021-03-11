import express from 'express';
import mongoose from 'mongoose';

// Example mongodb connection
mongoose.connect(
  `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected'));

// Example express server
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`DB_HOST${process.env.DB_HOST}`);
});

app.listen(port, () => {
  console.log(`express is listening on port ${port}`);
});
