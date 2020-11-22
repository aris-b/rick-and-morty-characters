import React from 'react';
import PropTypes from 'prop-types';
import CharactersList from 'components/CharacterList';
import ReactPaginate from 'react-paginate';
import './CharactersListPage.scss';

class CharactersListPage extends React.Component {
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
              // onPageChange={}
              previousLabel="<"
              nextLabel=">"
              containerClassName="CharactersListPage_pagination"
              subContainerClassName="CharactersListPage_paginationPages"
              activeClassName="CharactersListPage_paginationActive"
              disabledClassName="CharactersListPage_paginationDisabled"
            />
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
