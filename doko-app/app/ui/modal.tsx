import React, { ReactNode } from 'react';

// Define the props interface
interface ModalProps {
  open: boolean; // 'open' is a boolean that controls modal visibility
  onClose: () => void; // 'onClose' is a function that is triggered when the modal is closed
  children: ReactNode; // 'children' is the content of the modal (React's built-in type for child nodes)
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal with dark mode styles */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-[#2A2A3C] rounded-lg shadow-lg transition-all p-6 text-gray-200
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        style={{

          maxWidth: '66vw', // Cap the width to 66% of the viewport width
          maxHeight: '66vh', // Cap the height to 66% of the viewport height
          overflowY: 'auto', // Allow scrolling if content exceeds height
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-[#3B3B4D] hover:bg-[#4B4B5C] hover:text-gray-300"
        >
          X
        </button>
        
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
