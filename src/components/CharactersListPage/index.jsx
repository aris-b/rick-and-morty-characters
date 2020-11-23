import React from 'react';
import PropTypes from 'prop-types';
import CharactersList from 'components/CharacterList';
import ReactPaginate from 'react-paginate';
import './CharactersListPage.scss';

class CharactersListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pageIdx: 0,
    };
  }

  componentDidMount() {
    const { loadCharacters } = this.props;
    const { pageIdx } = this.state;
    loadCharacters({ page: pageIdx + 1 });
  }

  onPageChange = (data) => {
    const { loadCharacters } = this.props;
    const { selected } = data;
    this.setState({ pageIdx: selected });
    loadCharacters({ page: selected + 1 });
  }

  render() {
    const { isLoading, characters, meta } = this.props;
    const { pageIdx } = this.state;
    const { onPageChange } = this;

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

            <div className="CharactersListPage_filter">
              <label
                className="CharactersListPage_filterFieldContainer"
                htmlFor="character-list-filter-name"
              >
                <div className="CharactersListPage_filterFieldTitle">Name</div>
                <input
                  className="CharactersListPage_filterField"
                  name="character-list-filter-name"
                  id="character-list-filter-name"
                  type="text"
                  placeholder="Start typing name..."
                />
              </label>
              <label
                className="CharactersListPage_filterFieldContainer"
                htmlFor="character-list-filter-gender"
              >
                <div className="CharactersListPage_filterFieldTitle">Gender</div>
                <select
                  className="CharactersListPage_filterField CharactersListPage_filterField___select"
                  name="character-list-filter-gender"
                  id="character-list-filter-gender"
                >
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
          </div>
        )}

      </div>
    );
  }
}

CharactersListPage.propTypes = {
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

CharactersListPage.defaultProps = {
  isLoading: false,
};

export default CharactersListPage;
