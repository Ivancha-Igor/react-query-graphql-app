import React from 'react';
import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { IClient } from '../interfaces/interfaces';

const endpoint = 'https://test-task.expaneqwq.pro/api/graphql';

export const ClientsList: React.FC = () => {
  const GET_CLIENTS = gql`
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

  const fetchClients = async () => {
    const { getClients: data } = await request(endpoint, GET_CLIENTS);
    return data;
  };

  const { data, isLoading, error } = useQuery<IClient[]>(
    'clients',
    fetchClients
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  console.log(data);

  return (
    <ul>
      {data?.map((client) => (
        <li key={client.id}>
          {client.id} {client.firstName} {client.lastName}
        </li>
      ))}
    </ul>
  );
};
