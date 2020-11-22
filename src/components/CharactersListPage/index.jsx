import React from 'react';
import PropTypes from 'prop-types';
// import CharacterList from 'components/CharacterList';
import './CharactersListPage.scss';

class CharactersListPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children } = this.props;
    // const {} = this.state;
    // const {} = this;

    return (
      <div className="CharactersListPage">
        {children}
      </div>
    );
  }
}

CharactersListPage.propTypes = {
  children: PropTypes.node.isRequired,
};

CharactersListPage.defaultProps = {};

export default CharactersListPage;
