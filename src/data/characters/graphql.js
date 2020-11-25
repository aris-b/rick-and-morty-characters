import { gql } from '@apollo/client';

const getCharactersQuery = () => gql`
    query($page: Int!, $filterName: String, $filterGender: String) {
      characters(page: $page, filter: { name: $filterName, gender: $filterGender }) {
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
          episode {
            name
          }
        }
      }
    }
  `;

export default getCharactersQuery;
