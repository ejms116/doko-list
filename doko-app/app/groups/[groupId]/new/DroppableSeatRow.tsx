import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export interface DroppableSeatRowProps {
  id: Number;
  children: any;
}

const DroppableSeatRow: React.FC<DroppableSeatRowProps> = (props) => {
// export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default DroppableSeatRow;