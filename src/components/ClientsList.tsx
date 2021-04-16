import React from 'react';
import { request } from 'graphql-request';
import { useQuery } from 'react-query';

import { IClient } from '../interfaces/interfaces';
import { GET_CLIENTS } from '../graphql/getClients';
import { Loading } from './Loading';
import { Error } from './Error';

const endpoint = 'https://test-task.expane.pro/api/graphql';
const defaultAvatar = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';

export const ClientsList: React.FC = () => {
  const fetchClients = async () => {
    const { getClients: data } = await request(endpoint, GET_CLIENTS);
    return data;
  };

  const { data, isLoading, error } = useQuery<IClient[]>(
    'clients',
    fetchClients
  );

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  console.log(data);

  return (
    <div className='flex flex-col max-w-xl mx-auto'>
      <div className='-my-2 sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 text-center bg-blue-50 py-4'>
              Clients List
            </h2>
            <table className='max-w-lg min-w-full mx-auto divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Avatar
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Phone
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data?.map((client) => (
                  <tr key={client.id}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <img
                        className='h-10 w-10 rounded-full truncate'
                        src={`${
                          client.avatarUrl ? client.avatarUrl : defaultAvatar
                        }`}
                        alt={`${client.firstName} ${client.lastName}`}
                      />
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        {client.firstName} {client.lastName}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>
                        {client.phone}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        type='button'
                        className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
