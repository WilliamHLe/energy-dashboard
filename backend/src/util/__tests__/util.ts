import mongoose, { Connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connects to a in-memory mongodb server to easily
 * perform integration tests on mongoose queries.
 */
const connectDatabase = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);

  const db: Connection = mongoose.connection;

  // eslint-disable-next-line no-console
  db.once('open', () => console.log('Connected to in-memory database.'));
  db.on('error', console.error.bind(console, 'Database error:'));
};

/**
 * Closes the in-memory mongodb server and removes
 * collections from the database.
 */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

export default {
  connectDatabase,
  closeDatabase,
};
