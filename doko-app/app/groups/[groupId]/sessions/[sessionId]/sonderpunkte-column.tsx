import React from 'react';

const SonderpunkteColumn: React.FC = () => {
  return (
    <div className="grid grid-cols-2 grid-flow-row">
      {/* Header for Sonderpunkte */}
      <div className="col-span-2 text-lg font-bold text-center">Sonderpunkte</div>

      {/* Subheader */}
      <div className="text-center">Re</div>
      <div className="text-center">Contra</div>

      {/* Empty fields for Sonderpunkte */}
      {[...Array(4)].map((_, index) => (
        <React.Fragment key={index}>
          <div className="text-center">index</div>
          <div className="text-center"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SonderpunkteColumn;
