import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  function toggleModal() {
    setOpen((prev) => !prev);
  }
  return {
    open,
    toggleModal,
  };
};
