import { gql } from '@apollo/client';

// TODO: remove it
// filter: { name: "rick" }

const getCharactersQuery = ({ page, filter }) => {
  console.log('filter:', filter);
  return gql`
    query {
      characters(page: ${page}, filter: { name: "${filter.name}" }) {
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
};

export default getCharactersQuery;
