import { gql } from 'apollo-server';

export default gql`
  type Group {
    id: ID!
    name: String!
  }

  type Mutation {
    group(id: ID!): Group
    groups: [Group!]!
  }
`;
