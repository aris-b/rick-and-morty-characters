import { connect } from 'react-redux';
import CharacterListPage from 'components/CharactersListPage';

const CharacterListPageContainer = connect(
  (state) => {
    const { characters } = state;
    return {
      isLoading: characters.isLoading,
      pageIdx: characters.pageIdx,
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
