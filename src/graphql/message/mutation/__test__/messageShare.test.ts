import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';

it('creates a message', async () => {});

it("fails to share if the the user is not in group's members list", async () => {});

it('fails when group with requested groupId does not exist', async () => {});

it('fails when group with requested groupId is archived', async () => {});

it('fails when user is not authenticated', async () => {});

it("updates all corresponding group's members's lastMessage and increments unreadMessageCount", async () => {});
