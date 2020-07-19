import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';

it('removes a message created by the requesting user', async () => {});

if ('removes someone else\'s message by the requesting user with type owner')
  it("if this message is in user's lastMessage that message is updated as archived message");

it('fails when a requesting user and image is not in the same group');

it('fails when user is not authenticated');

it('fails when user of type normal is trying to remove otherss messages');
