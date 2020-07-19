import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('sets the requested group as default. Other groups isDefault are set to false', async () => {});

it('upgrades oldest existing member to owner if the only exsisting owner leaves', async () => {});

it('fails when group does not exist', async () => {});

it('fails when the user is not a member of the group', async () => {});

it('fails when user is not authenticated', async () => {});

it('when group is archived', async () => {});
