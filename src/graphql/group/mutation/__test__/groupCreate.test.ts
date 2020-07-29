import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';

export const CREATE_GROUP = gql`
  mutation($name: String!) {
    groupCreate(name: $name) {
      id
      name
      creatorId
      members {
        userId
        name
        joinedAt
        type
      }
    }
  }
`;

it("creates a group and add this user to the new group's members list", async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));

  const { data, errors } = await mutate({ mutation: CREATE_GROUP, variables: { name: 'spacex' } });

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  expect(data!.groupCreate).toEqual(true);
  let groups = await Group.find({});
  expect(groups.length).toBe(1);
  let group = groups[0];
  expect(group.name).toBe('spacex');
  expect(group.creatorId).toBe(user.id);
  expect(group.creatorName).toBe(user.name);
  expect(group.isArchived).toBeFalsy();
  expect(group.members.length).toBe(1);
  let member = group.members[0];
  expect(member.userId).toBe(user.id);
  expect(member.name).toBe(user.name);
  expect(member.type).toBe('owner');
});

it('fails when valid accesstoken is not provided', async () => {
  const { mutate } = createTestClient(server({ accessToken: 'sadfsdf' }));

  const { data, errors } = await mutate({ mutation: CREATE_GROUP, variables: { name: 'spacex' } });

  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('로그인이 필요합니다.');
  expect(data).toBeUndefined();
  let group = await Group.find({});
  expect(group.length).toBe(0);
});

it('fails when name of group is not provided', async () => {
  const { accessToken } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));

  const { data, errors } = await mutate({ mutation: CREATE_GROUP });

  expect(errors).toBeDefined();
  expect(data).toBeUndefined();
  let group = await Group.find({});
  expect(group.length).toBe(0);
});
