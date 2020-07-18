import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    groupCreate(name: String!): Boolean
    groupInvite(groupId: ID!, userIds: [ID!]!, message: String): Group
    groupLeave(groupId: ID!): Boolean
    groupKickUser(groupId: ID!, userId: ID!): Boolean
    groupSetDefault(groupId: ID!): Boolean
  }
`;
