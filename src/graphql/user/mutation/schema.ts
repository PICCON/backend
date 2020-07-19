import { gql } from 'apollo-server';

export default gql`
  extend type Mutation {
    userRegisterKakao(kakaoId: String!, kakaoAccessToken: String!, name: String!, phone: String!): UserTokenResponse!
    userLoginKakao(kakaoId: String!, kakaoAccessToken: String!): UserTokenResponse!
    userArchive: Boolean!
    """
    해당 유저가 더 이상 나를 초대할 수 없도록 차단한다.
    """
    userBan(userId: ID!): Boolean!
  }

  type UserTokenResponse {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
`;
