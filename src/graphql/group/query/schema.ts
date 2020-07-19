import { gql } from 'apollo-server';

export default gql`
  type Group {
    id: ID!
    name: String!
    creatorId: String!
    creatorName: String!
    isArchived: Boolean!
    members: [GroupMember!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type GroupMember {
    userId: String!
    name: String!
    joinedAt: Date!
    type: MemberType
  }

  enum MemberType {
    normal
    owner
  }

  enum GroupSortProperty {
    name
    createdAt
    updatedAt
  }

  type Query {
    group(id: ID!): Group
    groups(criteria: GroupCriteria, sortProperty: GroupSortProperty, offset: Int, limit: Int): [Group!]!
  }

  input GroupCriteria {
    groupIds: [ID!]
    creatorId: ID
    isArchived: Boolean
    membersIn: [ID!]
  }
`;
