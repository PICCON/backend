import { server } from '../../../../server';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';

const { mutate } = createTestClient(server({ accessToken: undefined }));

it('find user', async () => {
  const CREATE_GROUP = gql`
    mutation($name: String!) {
      groupCreate(name: $name)
    }
  `;
  const { data, errors } = await mutate({ mutation: CREATE_GROUP, variables: { name: 'spacex' } });

  expect(errors).toBeUndefined();
  expect(data).toBeDefined();
  expect(data!.groupCreate).toEqual(true);
});
