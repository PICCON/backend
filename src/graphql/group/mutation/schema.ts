import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    groupCreate(name: String!): Group
    groupInvite(groupId: ID!, userIds: [ID!]!): Group
    groupLeave(groupId: ID!): Boolean
    groupKickUser(groupId: ID!, userId: ID!): Boolean
    """
    기본 그룹으로 설정한다. 기존에 기본으로 설정되어 있던 그룹은 기본에서 해제된다(isDefault:false).
    """
    groupSetDefault(groupId: ID!): Boolean
  }
`;
