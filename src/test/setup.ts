import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User, RegisterType, UserDoc } from '../models/user';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<{ accessToken: string; user: UserDoc }>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  let user = await User.build({ name: 'Nikola Tesla', phone: '0101111222', registerType: RegisterType.Apple });
  const payload = { userId: user.id, name: user.name };
  return { accessToken: jwt.sign(payload, process.env.JWT_KEY!), user };
};
