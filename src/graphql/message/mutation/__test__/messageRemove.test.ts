import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';

it('removes a message created by the requesting user', async () => {});

it("removes someone else's message by the requesting user with type owner", async () => {});

it("if this message is in user's lastMessage that message is updated as archived message", async () => {});

it('fails when a requesting user and image is not in the same group', async () => {});

it('fails when user is not authenticated', async () => {});

it('fails when user of type normal is trying to remove otherss messages', async () => {});
