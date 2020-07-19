import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('bans a user', async () => {});

it('fails if user is not authenticated');

it('fails if the userId for banning is invalid', async () => {});

it('makes banned user impossible to invite the user who has banned him', async () => {});
