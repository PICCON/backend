import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('archives a user', async () => {});

it('removes this archived user from all associated groups');

it('fails if user is not logged in', async () => {});

it('fails if user is already archived', async () => {});
