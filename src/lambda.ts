import { ApolloServer, gql } from 'apollo-server-lambda';
import { decode } from 'jsonwebtoken';
import { schema } from './graphql';

const server = new ApolloServer({
  schema,
  mocks: true,
  context: ({ req }) => {
    // let accesstoken = req.headers.accesstoken as string;
    // let context = {
    //   //dataloaders
    //   userId: undefined
    // };
    // if (!accesstoken) return context;
    // let { userId }: any = decode(accesstoken);
    // context.userId = userId;
    // return context;
  },
  formatError: error => {
    console.dir(error, { depth: 30, colors: true });
    return error;
  }
});

export const graphqlHandler = server.createHandler();
