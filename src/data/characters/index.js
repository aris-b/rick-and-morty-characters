import client from 'data/graphql';
import getCharactersQuery from './graphql';

const characters = {
  state: {
    isLoading: false,
    items: [],
    meta: {
      count: 0,
      pages: 1,
    },
  },

  reducers: {
    // handle state changes with pure functions
    updateIsLoading(state, payload) {
      const { isLoading } = payload;
      return {
        ...state,
        isLoading,
      };
    },
    updateItems(state, payload) {
      const { items } = payload;
      return {
        ...state,
        items,
      };
    },
    updateMeta(state, payload) {
      const { meta } = payload;
      return {
        ...state,
        meta,
      };
    },
  },

  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    // eslint-disable-next-line no-unused-vars
    async loadCharacters(payload, rootState) {
      const { page = 1, filter = null } = payload || {};

      const request = client.query({
        query: getCharactersQuery({ page, filter }),
      });

      dispatch.characters.updateIsLoading({
        isLoading: true,
      });

      const response = await request;
      console.log('response:', response);

      dispatch.characters.updateItems({
        items: response.data.characters.results,
      });
      dispatch.characters.updateMeta({
        meta: response.data.characters.info,
      });
      dispatch.characters.updateIsLoading({
        isLoading: false,
      });
    },
  }),
};

export default characters;
