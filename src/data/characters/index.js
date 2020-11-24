import client from 'data/graphql';
import getCharactersQuery from './graphql';

export const ERROR_TYPES = {
  NO_RESULTS: 'NO_RESULTS',
};

const ERRORS_BY_RESPONSE_MSG = {
  '404: Not Found': ERROR_TYPES.NO_RESULTS,
};

const characters = {
  state: {
    isLoading: false,
    items: [],
    meta: {
      count: 0,
      pages: 1,
    },
    pageIdx: 0,
    filterName: '',
    filterGender: 'any',
    error: null,
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
    updatePageIdx(state, payload) {
      const { pageIdx } = payload;
      return {
        ...state,
        pageIdx,
      };
    },
    updateFilterName(state, payload) {
      const { filterName } = payload;
      return {
        ...state,
        filterName,
      };
    },
    updateFilterGender(state, payload) {
      const { filterGender } = payload;
      return {
        ...state,
        filterGender,
      };
    },
    updateError(state, payload) {
      const { error } = payload;
      console.log('error:', error);
      let errorType = error;
      if (error && error.graphQLErrors) {
        console.log('error.graphQLErrors:', error.graphQLErrors);
        errorType = ERRORS_BY_RESPONSE_MSG[error.graphQLErrors[0].message];
      }
      return {
        ...state,
        error: errorType,
      };
    },
  },

  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async loadCharacters(payload, rootState) {
      console.log('loadCharacters:', payload);
      const { pageIdx, filterName, filterGender } = payload || {};
      const {
        pageIdx: pageIdxCurrent,
        filterName: filterNameCurrent,
        filterGender: filterGenderCurrent,
      } = rootState.characters;

      const request = client.query({
        query: getCharactersQuery({
          page: (pageIdx !== undefined ? pageIdx : pageIdxCurrent) + 1,
          filter: {
            name: filterName !== undefined ? filterName : filterNameCurrent,
            gender: filterGender !== undefined ? filterGender : filterGenderCurrent,
          },
        }),
      });

      dispatch.characters.updateIsLoading({
        isLoading: true,
      });
      dispatch.characters.updateError({
        error: null,
      });

      let response;
      try {
        response = await request;

        dispatch.characters.updateItems({
          items: response.data.characters.results,
        });
        dispatch.characters.updateMeta({
          meta: response.data.characters.info,
        });
      } catch (error) {
        if (error.graphQLErrors) {
          const errorType = ERRORS_BY_RESPONSE_MSG[error.graphQLErrors[0].message];
          if (errorType === ERROR_TYPES.NO_RESULTS) {
            dispatch.characters.updateItems({
              items: [],
            });
            dispatch.characters.updateMeta({
              meta: {
                count: 0,
                pages: 1,
              },
            });
          }
        }

        dispatch.characters.updateError({
          error,
        });
      } finally {
        if (pageIdx !== undefined) {
          dispatch.characters.updatePageIdx({
            pageIdx,
          });
        }
        if (filterName !== undefined) {
          dispatch.characters.updateFilterName({
            filterName,
          });
        }
        if (filterGender !== undefined) {
          dispatch.characters.updateFilterGender({
            filterGender,
          });
        }
        dispatch.characters.updateIsLoading({
          isLoading: false,
        });
      }
    },
  }),
};

export default characters;
