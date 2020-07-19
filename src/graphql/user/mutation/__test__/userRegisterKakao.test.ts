import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { Group } from '../../../../models/group';
import { User, RegisterType } from '../../../../models/user';

it('registers user with Kakao accessToken', async () => {});

it('logs in a user if the user is already signed up', async () => {});

it('fails if kakaoAccessToken does not match with kakaoId', async () => {});

it('fails if the phone number is already used', async () => {});
