import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('invites an existing user to an existing group', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));

  let group = await Group.build({ name: 'tesla', creatorId: user.id });
  let user1 = await User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple });

  const GROUP_INVITE = gql`
    mutation($groupId: ID!, $userIds: [ID!]!) {
      groupInvite(groupId: $groupId, userIds: $userIds) {
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

  const { data, errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id] }
  });

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  let group_ = data!.groupInvite;
  expect(group_).toBeDefined();
  expect(group_.id).toEqual(group.id.toString());
  expect(group_.name).toEqual(group.name);
  expect(group.members.length).toEqual(2);
  let newMember = group.members[1];
  expect(newMember.userId).toEqual(user1.id.toString());
  expect(newMember.name).toEqual(user1.name);
  expect(newMember.type).toEqual('normal');
  expect(typeof newMember.joinedAt).toEqual('object');
});

it('creates an invitation message to the invited user', async () => {});

it('can invite without explicit invitation message', async () => {});

it('invites multiple existing users to an existing group', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));

  let group = await Group.build({ name: 'tesla', creatorId: user.id });
  let user1 = await User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple });
  let user2 = await User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple });
  let user3 = await User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao });

  const GROUP_INVITE = gql`
    mutation($name: ID!, $userIds: [ID!]!) {
      groupInvite(groupId: $groupId, userIds: $userIds) {
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

  const { data, errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  let group_ = data!.groupInvite;
  expect(group_).toBeDefined();
  expect(group_.id).toEqual(group.id.toString());
  expect(group_.name).toEqual(group.name);
  expect(group.members.length).toEqual(4);
  expect(
    group.members.filter(v => v.userId === user1.id.toString() && v.name === user1.name && v.type === 'normal')
  ).toBe(1);
  expect(
    group.members.filter(v => v.userId === user2.id.toString() && v.name === user2.name && v.type === 'normal')
  ).toBe(1);
  expect(
    group.members.filter(v => v.userId === user2.id.toString() && v.name === user2.name && v.type === 'normal')
  ).toBe(1);
});

it('fails when userIds are not provided', async () => {});

it('fails when user is not authenticated', async () => {});

it('fails when groupId is not provided', async () => {});

it('fails when one of the provided userIds contains an unexisting userId', async () => {});

it('succeeds but does not duplicate members list when already registered userId is requested again.', async () => {});

it('succeeds but does not duplicate members list when duplicate userIds are requested in a single mutaion call', async () => {});

it('fails when userIds contains archived users', async () => {});

it('fails when group is archived', async () => {});

it('fails when group does not exist', async () => {});

it('fails when a user is invited by a unauthorized member', async () => {});
