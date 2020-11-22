import { connect } from 'react-redux';
import CharacterList from 'components/CharacterList';

const CharacterListContainer = connect(
  (state) => {
    const { characters } = state;
    return {
      isLoading: characters.isLoading,
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
)(CharacterList);

export default CharacterListContainer;
