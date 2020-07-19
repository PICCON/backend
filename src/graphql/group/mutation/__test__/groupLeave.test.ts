import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('leaves a group and generates a leaving message', async () => {});

it('upgrades oldest existing member to owner if the only exsisting owner leaves', async () => {});

it('fails when trying to leave a group that does not exist', async () => {});

it('fails when trying to leave a group when the requested user is not a member', async () => {});

it('fails when user is not authenticated', async () => {});

it('archives the group and all its related messages when the user leaving the group is the only remaining member of the group', async () => {});
