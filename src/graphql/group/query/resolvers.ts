import { QueryResolvers } from '../../types';
const resolvers: { Query: QueryResolvers } = {
  Query: {
    group: async () => ({ id: '1', name: 'tesla' }),
    groups: async () => [{ id: '1', name: 'tesla' }, { id: '2', name: 'spacex' }]
  }
};

export default resolvers;
