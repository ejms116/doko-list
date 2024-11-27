import React from 'react';

interface MessageProps {
    text: string;
}

const Message: React.FC<MessageProps> = ({text}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E1E2C]">
      <p className="text-gray-200 text-lg mt-4">{text}</p>
    </div>
  );
}

export default Message;
