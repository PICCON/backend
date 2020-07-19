import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('kicks a user of type normal when requested by a user of type owner', async () => {});

it('cannot kick a user of type owner even if the requested user is type owner', async () => {});

it('fails when the requesting user is not authenticated', async () => {});

it('fails when the requesting user is not a type owner and member of the group', async () => {});

it('fails when trying to kick a user that is not in members list', async () => {});
