import { gql } from 'apollo-server';

export default gql`
  """
  그룹에 생성되는 메시지 단위이다. 사진들은 메시지에 1:N 관계로 내장된다.
  """
  type Message {
    id: ID!
    groupId: ID!
    text: String
    isArchived: Boolean!
    images: [MessageImage!]!
    userId: ID!
    userName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type MessageImage {
    key: String!
    location: String
    createdAt: DateTime
  }

  type Query {
    message(id: ID!): Message
    messages(criteria: MessageCriteria, sortProperty: MessageSortProperty, offset: Int, limit: Int): [Message!]!
  }

  input MessageCriteria {
    ids: [ID!]
    userId: ID
    groupId: ID
    isArchived: Boolean
    createdAtGte: DateTime
    createdAtLte: DateTime
    updatedAtGte: DateTime
    updatedAtLte: DateTime
  }

  enum MessageSortProperty {
    createdAt
    updatedAt
    userId
    groupId
  }
`;
