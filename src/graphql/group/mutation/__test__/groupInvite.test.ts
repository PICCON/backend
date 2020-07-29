import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType, UserDoc } from '../../../../models/user';
import mongoose from 'mongoose';

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

it("invites an existing user to an existing group and appends this user to group's members list. group is also added to invited user's group list", async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));

  let group = await (await Group.build({ name: 'tesla', creatorId: user.id })).save();
  let user1: null | UserDoc = await User.build({
    name: 'Elon Musk',
    phone: '010123123',
    registerType: RegisterType.Apple
  }).save();

  const { data, errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id] }
  });

  user1 = await User.findById(user1._id);

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  let group_ = data!.groupInvite;
  expect(group_).toBeDefined();
  expect(group_.id).toEqual(group.id.toString());
  expect(group_.name).toEqual(group.name);
  expect(group.members.length).toEqual(2);
  let newMember = group.members[1];
  expect(newMember.userId).toEqual(user1!.id.toString());
  expect(newMember.name).toEqual(user1!.name);
  expect(newMember.type).toEqual('normal');
  expect(typeof newMember.joinedAt).toEqual('object');
  expect(user1!.groups.length).toEqual(1);
  let newGroup = user1!.groups[0];
  expect(newGroup.groupId).toEqual(group.id.toString());
  expect(newGroup.unreadMessageCount).toEqual(1);
  expect(newGroup.lastMessage.text).toEqual('Elon Musk님이 입장했습니다.');
});

it('invites multiple existing users to an existing group', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  const { data, errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  let group_ = data!.groupInvite;
  expect(group_).toBeDefined();
  expect(group_.id).toEqual(group!.id.toString());
  expect(group_.name).toEqual(group!.name);
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

it('fails when userIds are not provided', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const group = await Group.build({ name: 'tesla', creatorId: user.id });
  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [] }
  });

  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('초대하실 유저들을 선택해주세요.');

  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(1);
});

it('fails when user is not authenticated', async () => {
  const { accessToken, user } = await global.signin();
  const group = await Group.build({ name: 'tesla', creatorId: user.id });

  let user1: UserDoc | null = await User.build({
    name: 'Elon Musk',
    phone: '010123123',
    registerType: RegisterType.Apple
  });
  const { mutate } = createTestClient(server({ accessToken: undefined }));
  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id] }
  });

  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('로그인을 해주세요.');

  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(1);

  user1 = await User.findById(user1.id);
  expect(user1!.groups.length).toEqual(0);
});

it('fails when one of the provided userIds contains an unexisting userId', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  const invalidUserId = new mongoose.Types.ObjectId();
  const { data, errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id, invalidUserId] }
  });

  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual(`존재하지 않는 유저(${invalidUserId})입니다.`);

  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(4);
});

it('succeeds but does not duplicate members list when already registered userId is requested again.', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);
  await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });
  await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });
  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(4);
});

it('succeeds but does not duplicate members list when duplicate userIds are requested in a single mutaion call', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);
  await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id, user3.id, user2.id] }
  });
  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(4);
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

it('fails when userIds contains archived users', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  await user3.archive();
  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });
  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('초대하려고 하는 사용자 중에서 탈퇴한 회원이 존재해서 초대를 실패했습니다.');
  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(1);
});

it('fails when group is archived', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [group, user1, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user.id })).save(),
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  await group.archive();
  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user1.id, user2.id, user3.id] }
  });
  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('사용 중단된 그룹입니다.');
  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(1);
});

it('fails when group does not exist', async () => {
  const { accessToken, user } = await global.signin();
  const { mutate } = createTestClient(server({ accessToken }));
  const [user1, user2, user3] = await Promise.all([
    User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  const invalidGroupId = new mongoose.Types.ObjectId();
  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: invalidGroupId, userIds: [user1.id, user2.id, user3.id] }
  });
  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('존재하지 않는 그룹입니다.');
});

it('fails when a user is invited by a unauthorized member', async () => {
  let user1 = await User.build({ name: 'Elon Musk', phone: '010123123', registerType: RegisterType.Apple }).save();
  const [group, user2, user3] = await Promise.all([
    (await Group.build({ name: 'tesla', creatorId: user1.id })).save(),
    User.build({ name: 'Steve Jobs', phone: '123345', registerType: RegisterType.Apple }).save(),
    User.build({ name: 'Bill Gates', phone: '9087765', registerType: RegisterType.Kakao }).save()
  ]);

  const { accessToken, user } = await global.signin(user2.id);
  const { mutate } = createTestClient(server({ accessToken }));

  const { errors } = await mutate({
    mutation: GROUP_INVITE,
    variables: { groupId: group.id, userIds: [user2.id, user3.id] }
  });
  expect(errors).toBeDefined();
  expect(errors![0].message).toEqual('방장만 초대할 수 있습니다.');
  let updatedGroup = await Group.findById(group.id);
  expect(updatedGroup!.members.length).toEqual(1);
});

it('fails when trying to invite a user who has banned the requesting user.', async () => {});

it('can invite a banned user as long as that user has not banned the requesting user. This user is now excluded from the banned list', async () => {});
