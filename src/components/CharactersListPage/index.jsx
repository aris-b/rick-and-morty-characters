import React from 'react';
import PropTypes from 'prop-types';
import CharactersList from 'components/CharacterList';
import ReactPaginate from 'react-paginate';
import CharacterListFilter from 'components/CharactersListFilter';
import './CharactersListPage.scss';

class CharactersListPage extends React.Component {
  componentDidMount() {
    const { loadCharacters } = this.props;
    const { page } = this.props;
    loadCharacters({ page });
  }

  onPageChange = (data) => {
    const { loadCharacters } = this.props;
    const { selected } = data;
    console.log('Page clicked:', selected);
    loadCharacters({ page: selected + 1 });
  }

  onFilterNameChange = (data) => {
    const { value } = data.target;
    const { loadCharacters } = this.props;
    loadCharacters({ page: 1, filterName: value });
  }

  onFilterGenderChange = (data) => {
    const { value } = data.target;
    const { loadCharacters } = this.props;
    loadCharacters({ page: 1, filterGender: value });
  }

  render() {
    const {
      isLoading, characters, meta, page, filterName, filterGender,
    } = this.props;
    const { onPageChange, onFilterNameChange, onFilterGenderChange } = this;
    console.log('Chars:', characters);

    return (
      <div className="CharactersListPage">
        {isLoading && (
          <div className="CharactersListPage_loading">
            Loading ...
          </div>
        )}

        {characters && (
          <div className="CharactersListPage_container">
            <CharactersList characters={characters} />

            {meta.count ? (
              <ReactPaginate
                pageCount={meta.pages}
                forcePage={page - 1}
                onPageChange={onPageChange}
                previousLabel="<"
                nextLabel=">"
                containerClassName="CharactersListPage_pagination"
                subContainerClassName="CharactersListPage_paginationPages"
                activeClassName="CharactersListPage_paginationActive"
                disabledClassName="CharactersListPage_paginationDisabled"
              />
            ) : (
              !isLoading && (
                <div className="CharactersListPage_noResults">
                  No result matching the criteria.
                </div>
              )
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
  page: PropTypes.number,
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
  page: 1,
};

export default CharactersListPage;
