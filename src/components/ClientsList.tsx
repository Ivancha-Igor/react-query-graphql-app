import { FC, useState } from 'react';
import { request } from 'graphql-request';
import { useQuery } from 'react-query';

import { IClient } from '../types/types';
import { GET_CLIENTS } from '../graphql/getClients';
import { useModal } from '../hooks/useModal';
import { Modal } from './Modal';
import { ClientItem } from './ClientItem';
import { Loading } from './Loading';
import { Error } from './Error';
import { Fetching } from './Fetching';

const endpoint = 'https://test-task.expane.pro/api/graphql';

export const ClientsList: FC = () => {
  const { open, toggleModal } = useModal();
  const [currentClient, setCurrentClient] = useState<IClient | null>(null);

  const fetchClients = async () => {
    const { getClients: data } = await request(endpoint, GET_CLIENTS);
    return data;
  };

  const { data, isLoading, isFetching, error, refetch } = useQuery<IClient[]>(
    'clients',
    fetchClients
  );

  const editClient = (event: React.MouseEvent<HTMLButtonElement>, client: IClient) => {
    event.preventDefault();
    setCurrentClient(client);
    
    toggleModal();
  };

  const addClient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentClient(null);
    
    toggleModal();
  };

  if (isLoading) return <Loading />;

  if (error) return <Error />;
  
  return (
    <div className='flex flex-col max-w-xl mx-auto'>
      <div className='-my-2 sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <div className='flex justify-center items-center bg-blue-50 px-6 py-4'>
              <h2 className='text-2xl font-bold leading-7 text-gray-900 text-center m-auto'>
                Clients List
              </h2>
              <button
                type='button'
                onClick={addClient}
                className='inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Add
              </button>
            </div>
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
                    <ClientItem client={client} />
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        type='button'
                        onClick={(event) => editClient(event, client)}
                        className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
      {isFetching && <Fetching />}
      <Modal open={open} hide={toggleModal} client={currentClient} setCurrentClient={setCurrentClient} {...{refetch}} />
    </div>
  );
};
