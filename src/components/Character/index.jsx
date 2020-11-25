import React from 'react';
import PropTypes from 'prop-types';
import './Character.scss';

const statusToClass = {
  Alive: 'alive',
  Dead: 'dead',
  unknown: 'unknown',
};

const Character = ({
  name, status, species, type, gender, origin, location, image, episode,
}) => (
  <div className="Character">
    <img className="Character_image" src={image} alt="Character" />

    <div className="Character_property Character_name">
      <div className="Character_nameText">
        <strong>
          {name}
        </strong>
      </div>
    </div>
    <div className="Character_property Character_genderAndSpecies">
      <div className="Character_text">
        <strong>
          {`${gender} ${species}`}
        </strong>
      </div>
    </div>

    <table className="Character_propertiesGrid">
      <tbody>
        <tr>
          <td className="Character_propertiesGridColTitle">Status:</td>
          <td className="Character_propertiesGridColValue">
            <div className={`Character_statusValue Character_statusValue___${statusToClass[status]}`}>
              {status}
            </div>
          </td>
        </tr>
        <tr>
          <td className="Character_propertiesGridColTitle">Origin:</td>
          <td className="Character_propertiesGridColValue">
            <div className="Character_propertiesGridColValueText">
              {origin.name}
            </div>
          </td>
        </tr>
        <tr>
          <td className="Character_propertiesGridColTitle">Location:</td>
          <td className="Character_propertiesGridColValue">
            <div className="Character_propertiesGridColValueText">
              {location.name}
            </div>
          </td>
        </tr>
        {!!type && (
          <tr>
            <td className="Character_propertiesGridColTitle">Type:</td>
            <td className="Character_propertiesGridColValue">
              <div className="Character_propertiesGridColValueText">
                {type}
              </div>
            </td>
          </tr>
        )}
        {!!episode.length && (
          <tr>
            <td className="Character_propertiesGridColTitle">First seen:</td>
            <td className="Character_propertiesGridColValue">
              <div className="Character_propertiesGridColValueText">
                {episode[0].name}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

Character.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  origin: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  image: PropTypes.string.isRequired,
  episode: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

Character.defaultProps = {
  episode: [],
};

export default Character;
