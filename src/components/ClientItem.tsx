import { FC } from 'react';
import { IClient } from '../types/types';

interface IClientItem {
  client: IClient
}

const defaultAvatar =
  'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png';

export const ClientItem: FC<IClientItem> = ({ client }) => {
  return (
    <>
      <td className='px-6 py-4 whitespace-nowrap'>
        <img
          className='h-10 w-10 rounded-full truncate'
          src={client.avatarUrl ? client.avatarUrl : defaultAvatar}
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
          {client.phone ? client.phone : '-'}
        </div>
      </td>
    </>
  );
};
