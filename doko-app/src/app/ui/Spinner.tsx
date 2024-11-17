import React from 'react';

interface SpinnerProps {
    text: string;
}

const Spinner: React.FC<SpinnerProps> = ({text}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E2C]">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-white/50"></div>
      <p className="text-gray-200 text-lg mt-4">{text}</p>
    </div>
  );
}

export default Spinner;
