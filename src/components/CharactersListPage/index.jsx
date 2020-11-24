import React from 'react';
import PropTypes from 'prop-types';
import CharactersList from 'components/CharacterList';
import ReactPaginate from 'react-paginate';
import CharacterListFilter from 'components/CharactersListFilter';
import './CharactersListPage.scss';

class CharactersListPage extends React.Component {
  componentDidMount() {
    const { loadCharacters } = this.props;
    const { pageIdx } = this.props;
    loadCharacters({ pageIdx });
  }

  onPageChange = (data) => {
    const { loadCharacters } = this.props;
    const { selected } = data;
    loadCharacters({ pageIdx: selected + 1 });
  }

  onFilterNameChange = (data) => {
    const { value } = data.target;
    const { loadCharacters } = this.props;
    // this.setState({ filterName: value });
    loadCharacters({ filterName: value });
  }

  onFilterGenderChange = (data) => {
    const { value } = data.target;
    const { loadCharacters } = this.props;
    // this.setState({ filterGender: value });
    loadCharacters({ filterGender: value });
  }

  render() {
    const {
      isLoading, characters, meta, pageIdx, filterName, filterGender,
    } = this.props;
    const { onPageChange, onFilterNameChange, onFilterGenderChange } = this;

    return (
      <div className="CharactersListPage">
        {isLoading && (
          <div className="CharactersListPage_loading">
            Loading...
          </div>
        )}

        {!isLoading && (
          <div className="CharactersListPage_container">
            <CharactersList characters={characters} />

            {meta.count ? (
              <ReactPaginate
                pageCount={meta.count}
                forcePage={pageIdx}
                onPageChange={onPageChange}
                previousLabel="<"
                nextLabel=">"
                containerClassName="CharactersListPage_pagination"
                subContainerClassName="CharactersListPage_paginationPages"
                activeClassName="CharactersListPage_paginationActive"
                disabledClassName="CharactersListPage_paginationDisabled"
              />
            ) : (
              <div className="CharactersListPage_noResults">
                No result matching the criteria.
              </div>
            )}

            <CharacterListFilter
              filterName={filterName}
              filterGender={filterGender}
              onFilterNameChange={onFilterNameChange}
              onFilterGenderChange={onFilterGenderChange}
            />
          </div>
        )}

      </div>
    );
  }
}

CharactersListPage.propTypes = {
  isLoading: PropTypes.bool,
  pageIdx: PropTypes.number,
  filterName: PropTypes.string.isRequired,
  filterGender: PropTypes.string.isRequired,
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

CharactersListPage.defaultProps = {
  isLoading: false,
  pageIdx: 0,
};

export default CharactersListPage;
