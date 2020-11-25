import { connect } from 'react-redux';
import CharacterListPage from 'components/CharactersListPage';

const CharacterListPageContainer = connect(
  (state) => {
    const { characters } = state;
    return {
      isLoading: characters.isLoading,
      page: characters.page,
      filterName: characters.filterName,
      filterGender: characters.filterGender,
      characters: characters.items,
      meta: characters.meta,
    };
  },
  (dispatch) => {
    const { characters } = dispatch;
    return {
      loadCharacters: characters.loadCharacters,
    };
  },
)(CharacterListPage);

export default CharacterListPageContainer;
