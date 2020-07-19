import { gql } from 'apollo-server';

export default gql`
  extend type Mutation {
    """
    groupId를 제공하지 않을 경우 default로 설정된 group으로 메시지가 전송된다.
    """
    messageShare(groupId: ID, imageKeys: [ID!]!, text: String): Message!
    """
    comming soon
    """
    messageRemove(messageId: ID!): Boolean!
    """
    comming soon
    """
    messageRemoveImage(messageId: ID!, imageId: ID!): Boolean!
  }
`;
