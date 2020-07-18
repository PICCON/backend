import { makeExecutableSchema, gql } from 'apollo-server';
import CommonQuerySchema from './common/query/schema';
import CommonQueryResolvers from './common/query/resolver';
import GroupQuerySchema from './group/query/schema';
import GroupQueryResolvers from './group/query/resolvers';
import { merge } from 'lodash';

export const schema = makeExecutableSchema({
  typeDefs: [CommonQuerySchema, GroupQuerySchema],
  resolvers: merge(CommonQueryResolvers, GroupQueryResolvers)
});
