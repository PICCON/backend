import { makeExecutableSchema, gql } from 'apollo-server';
import GroupQuerySchema from './group/query/schema';
import GroupQueryResolvers from './group/query/resolvers';
import { merge } from 'lodash';

export const schema = makeExecutableSchema({
  typeDefs: [GroupQuerySchema],
  resolvers: merge(GroupQueryResolvers)
});
