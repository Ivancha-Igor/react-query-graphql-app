import { gql } from 'graphql-request';

export const GET_CLIENTS = gql`
  query {
    getClients {
      id
      firstName
      lastName
      phone
      avatarUrl
    }
  }
`;