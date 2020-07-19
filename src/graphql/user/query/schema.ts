import { gql } from 'apollo-server';

export default gql`
  """
  그룹에 생성되는 메시지 단위이다. 사진들은 메시지에 1:N 관계로 내장된다.
  """
  type User {
    id: ID!
    name: String!
    registerType: RegisterType!
    isArchived: Boolean!
    authVersion: Int!
    groups: [UserGroup!]!
    bannedUserIds: [ID!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum RegisterType {
    kakao
    apple
  }

  type UserGroup {
    groupId: ID!
    unreadMessageCount: Int!
    lastMessage: Message!
  }

  extend type Query {
    user(id: ID!): User
    users(criteria: UserCriteria, sortProperty: UserSortProperty, offset: Int, limit: Int): [User!]!
  }

  input UserCriteria {
    userIds: [ID!]
    userId: ID
    isArchived: Boolean
    createdAtGte: DateTime
    createdAtLte: DateTime
    updatedAtGte: DateTime
    updatedAtLte: DateTime
  }

  enum UserSortProperty {
    createdAt
    updatedAt
    userId
  }
`;
