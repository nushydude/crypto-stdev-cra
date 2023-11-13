import React, { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { useClickAway } from 'react-use';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    onClose();
  });

  return (
    <div className="p-4 z-10 fixed top-0 left-0 bottom-0 right-0 w-full h-screen flex items-center justify-center bg-modal-backdrop">
      <div
        ref={ref}
        className="max-h-full bg-gray-50 p-8 relative overflow-y-scroll shadow-md"
      >
        <MdClose
          size={24}
          className="absolute right-2 top-2 cursor-pointer"
          onClick={onClose}
        />

        {children}
      </div>
    </div>
  );
};

export default Modal;
