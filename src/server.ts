import { ApolloServer } from 'apollo-server';
import { decode } from 'jsonwebtoken';
import { schema } from './graphql';
const { NODE_ENV } = process.env;
export const server = (testHeaders?: { accessToken?: string; refreshToken?: string }) =>
  new ApolloServer({
    schema,
    mocks: true,
    context: ({ req }) => {
      let accesstoken = testHeaders ? testHeaders.accessToken : (req.headers.accesstoken as string);
      let context = {
        //dataloaders
        userId: undefined
      };
      if (!accesstoken) return context;
      let { userId }: any = decode(accesstoken);
      context.userId = userId;
      return context;
    },
    formatError: error => {
      console.dir(error, { depth: 30, colors: true });
      return error;
    }
  });
