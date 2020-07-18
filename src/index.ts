import { server } from './server';
import './models';
import mongoose from 'mongoose';

const start = async () => {
  try {
    const { NODE_ENV } = process.env;
    console.log(`mode: ${NODE_ENV}`);
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_ADDRESS, MONGO_SHARD } = process.env;
    if (!MONGO_USERNAME) throw new Error('MONGO_USERNAME must be defined.');
    if (!MONGO_PASSWORD) throw new Error('MONGO_PASSWORD must be defined');
    if (!MONGO_ADDRESS) throw new Error('MONGO_ADDRESS must be defined.');
    if (!MONGO_SHARD) throw new Error('MONGO_SHARD must be defined');

    await mongoose.connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}/piconn?ssl=true&replicaSet=${MONGO_SHARD}&authSource=admin&retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
    );
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
  server.listen(3000).then(({ url }: { url: string }) => console.log(`🚀 Server ready at ${url}`));
};

start();
