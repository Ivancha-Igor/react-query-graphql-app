import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { IFormInput, IModalProps } from '../interfaces/interfaces';
import { addNewClient } from '../graphql/addClient';
import { updateCurrentClient } from '../graphql/updateClient';

export const Modal: React.FC<IModalProps> = ({
  open,
  hide,
  client,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const add = useMutation(addNewClient);
  const update = useMutation(updateCurrentClient);

  const onSubmit = async (formData: IFormInput) => {
    if (client) {
      await update.mutateAsync({ id: client.id, ...formData });
    } else {
      await add.mutateAsync(formData);
    }
    refetch();
  };

  const clear = () => {
    refetch();
    hide();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        static
        className='fixed z-10 inset-0 overflow-y-auto'
        open={open}
        onClose={clear}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='mt-3 flex justify-center items-center'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-900 text-center mb-4'
                  >
                    {client ? 'Edit' : 'Add'}
                  </Dialog.Title>
                </div>
              </div>
              <form className='px-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4 flex justify-center items-center'>
                  <input
                    className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                    placeholder='First Name'
                    defaultValue={client?.firstName}
                    {...register('firstName', {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  {errors?.firstName && (
                    <p className='text-red-800'>
                      First Name is required, max length is 20
                    </p>
                  )}
                </div>

                <div className='mb-4 flex justify-center items-center'>
                  <input
                    className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                    placeholder='Last Name'
                    defaultValue={client?.lastName}
                    {...register('lastName', {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                  {errors?.lastName && (
                    <p className='text-red-800'>
                      Last Name is required, max length is 20
                    </p>
                  )}
                </div>

                <div className='mb-4 flex justify-center items-center'>
                  <input
                    className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                    placeholder='Phone number'
                    type='number'
                    defaultValue={client?.phone}
                    {...register('phone')}
                  />
                  {errors?.phone && <p className='text-red-800'>Only numbers</p>}
                </div>

                <div className='mb-4 flex justify-center items-center'>
                  <input
                    className='px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full'
                    placeholder='Link to Avatar'
                    defaultValue={client?.avatarUrl}
                    {...register('avatarUrl')}
                  />
                  {errors?.avatarUrl && (
                    <p className='text-red-800'>Add link to image</p>
                  )}
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-end'>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={clear}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-300 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={hide}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
