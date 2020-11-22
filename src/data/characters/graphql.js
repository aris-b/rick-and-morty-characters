import { gql } from '@apollo/client';

// TODO: remove it
// filter: { name: "rick" }

const getCharactersQuery = ({ page, filter }) => gql`
  query {
    characters(page: ${page}, filter: ${filter}) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

export default getCharactersQuery;
