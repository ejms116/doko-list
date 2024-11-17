'use client';

import React, { ReactNode, useEffect } from 'react';

// Define the props interface
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  return (
    // Backdrop
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? 'visible bg-black/30' : 'invisible'}
      `}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative bg-[#2A2A3C] rounded-lg shadow-lg transition-all p-6 text-gray-200
          ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
        `}
        style={{
          maxWidth: '66vw', 
          maxHeight: '66vh', 
          overflowY: 'auto', 
        }}
      >
        {/* Header section with title and close button */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{title}</h1>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 bg-[#3B3B4D] hover:bg-[#4B4B5C] hover:text-gray-300 transition-colors"
          >
            X
          </button>
        </div>

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
