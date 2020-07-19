import { makeExecutableSchema, gql } from 'apollo-server';
import CommonQuerySchema from './common/query/schema';
import CommonQueryResolvers from './common/query/resolver';
import GroupQuerySchema from './group/query/schema';
import GroupQueryResolvers from './group/query/resolvers';
import GroupMutationSchema from './group/mutation/schema';
import GroupMutationResolvers from './group/mutation/resolvers';
import MessageQuerySchema from './message/query/schema';
import MessageQueryResolvers from './message/query/resolvers';
import MessageMutationSchema from './message/mutation/schema';
import MessageMutationResolvers from './message/mutation/resolvers';
import UserQuerySchema from './user/query/schema';
import UserQueryResolvers from './user/query/resolvers';
import UserMutationSchema from './user/mutation/schema';
import UserMutationResolvers from './user/mutation/resolvers';

import { merge } from 'lodash';

export const schema = makeExecutableSchema({
  typeDefs: [
    CommonQuerySchema,
    GroupQuerySchema,
    GroupMutationSchema,
    MessageQuerySchema,
    MessageMutationSchema,
    UserQuerySchema,
    UserMutationSchema
  ],
  resolvers: merge(
    CommonQueryResolvers,
    GroupQueryResolvers,
    GroupMutationResolvers,
    MessageQueryResolvers,
    MessageMutationResolvers,
    UserMutationResolvers,
    UserQueryResolvers
  )
});
