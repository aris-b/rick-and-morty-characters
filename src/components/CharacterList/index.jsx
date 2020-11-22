import React from 'react';
import PropTypes from 'prop-types';
import Character from 'components/Character';
import './CharacterList.scss';

class CharacterList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { loadCharacters } = this.props;
    loadCharacters();
  }

  render() {
    const { isLoading, characters, meta } = this.props;
    // const {} = this.state;
    // const {} = this;

    return (
      <div className="CharacterList">
        {isLoading && (
          <div>
            Loading...
          </div>
        )}
        {characters.map((character) => (
          <Character
            key={character.id}
            id={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            type={character.type}
            gender={character.gender}
            origin={character.origin}
            location={character.location}
            image={character.image}
          />
        ))}
        {meta.count}
      </div>
    );
  }
}

CharacterList.propTypes = {
  isLoading: PropTypes.bool,
  characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    species: PropTypes.string,
    type: PropTypes.string,
    gender: PropTypes.string,
    origin: PropTypes.shape({
      name: PropTypes.string,
    }),
    location: PropTypes.shape({
      name: PropTypes.string,
    }),
    image: PropTypes.string,
  })).isRequired,
  meta: PropTypes.shape({
    count: PropTypes.number,
    pages: PropTypes.number,
  }).isRequired,
  loadCharacters: PropTypes.func.isRequired,
};

CharacterList.defaultProps = {
  isLoading: false,
};

export default CharacterList;
