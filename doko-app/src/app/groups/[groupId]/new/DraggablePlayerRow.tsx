import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export interface DraggablePlayerRowProps {
  id: number;
  name: string;
  email: string;
}

const DraggablePlayerRow: React.FC<DraggablePlayerRowProps> = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <tr key={props.id} className="bg-[#2A2A3C] text-gray-200 hover:bg-[#3B3B4D] transition-colors duration-200" 
        ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <td className="py-3 px-6">
          {props.name} ({props.email})
      </td>
    </tr>
  );
}

export default DraggablePlayerRow;


