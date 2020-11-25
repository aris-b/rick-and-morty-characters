import React from 'react';
import PropTypes from 'prop-types';
import Character from 'components/Character';
import './CharacterList.scss';

class CharacterList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { characters } = this.props;

    return (
      <div className="CharacterList">
        {characters.map((character) => (
          <Character
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            type={character.type}
            gender={character.gender}
            origin={character.origin}
            location={character.location}
            image={character.image}
            episode={character.episode}
          />
        ))}
      </div>
    );
  }
}

CharacterList.propTypes = {
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
};

CharacterList.defaultProps = {};

export default CharacterList;
