import mongoose, { Connection } from 'mongoose';

const getDbUri = (): string | undefined => {
  const connectionString = process.env.DB_CONNECTION_STRING;

  if (connectionString) {
    return connectionString;
  }

  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const db = process.env.DB_DATABASE;

  if (host && db) {
    const credentials = username && password ? `${username}:${password}` : '';
    return `mongodb://${credentials}@${host}/${db}`;
  }

  return undefined;
};

const connectDb = async (): Promise<void> => {
  const uri: string | undefined = getDbUri();
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (typeof uri !== 'undefined') {
    mongoose.connect(uri, options);

    const db: Connection = mongoose.connection;

    // eslint-disable-next-line no-console
    db.once('open', () => console.log('Connected to database.'));
    db.on('error', console.error.bind(console, 'Database error:'));
  } else {
    // eslint-disable-next-line no-console
    console.log('Running without database.');
  }
};

export default connectDb;
