import React from 'react';
import PropTypes from 'prop-types';
import './CharactersListFilter.scss';

const CharacterListFilter = ({
  filterName, onFilterNameChange, filterGender, onFilterGenderChange,
}) => (
  <div className="CharactersListFilter">
    <label
      className="CharactersListFilter_fieldContainer"
      htmlFor="character-list-filter-name"
    >
      <div className="CharactersListFilter_fieldTitle">
        Name
      </div>
      <input
        className="CharactersListFilter_field"
        name="character-list-filter-name"
        id="character-list-filter-name"
        type="text"
        placeholder="Start typing name..."
        value={filterName}
        onChange={onFilterNameChange}
      />
    </label>
    <label
      className="CharactersListFilter_fieldContainer"
      htmlFor="character-list-filter-gender"
    >
      <div className="CharactersListFilter_fieldTitle">
        Gender
      </div>
      <select
        className="CharactersListFilter_field CharactersListFilter_field___select"
        name="character-list-filter-gender"
        id="character-list-filter-gender"
        value={filterGender}
        onChange={onFilterGenderChange}
      >
        <option value="">
          Any
        </option>
        <option value="male">
          Male
        </option>
        <option value="female">
          Female
        </option>
        <option value="genderless">
          Genderless
        </option>
        <option value="unknown">
          Unknown
        </option>
      </select>
    </label>
  </div>
);

CharacterListFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterGender: PropTypes.string.isRequired,
  onFilterNameChange: PropTypes.func.isRequired,
  onFilterGenderChange: PropTypes.func.isRequired,
};

export default CharacterListFilter;
