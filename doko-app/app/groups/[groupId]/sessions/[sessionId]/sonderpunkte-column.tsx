import React from 'react';

import { Dulle, Fuchs, Charlie, Check, Fail, End, SpiderWeb, DoubleExlamationMark, ExplodingHead, Plus, Minus, Checkbox } from '../../../../ui/cards';

const SonderpunkteColumn: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-flow-row">
      {/* Header for Sonderpunkte */}
      <div className="col-span-3 text-lg font-bold text-center">Sonderpunkte</div>

      {/* Subheader */}
      <div className="text-center">Re</div>
      <div className="text-center"></div>
      <div className="text-center">Contra</div>

      {/* Empty fields for Sonderpunkte */}
      



        <div className="text-center">
          <Checkbox />
          <Checkbox />
    
        </div>
        <div className="text-center">
          <Fuchs />
          <SpiderWeb />
        </div>
        <div className="text-center">
          <Checkbox />
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Fuchs />
          <Fuchs />
          <Check />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Fuchs />
          <Fuchs />
          <Fail />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Fuchs />
          <End />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Dulle />
          <SpiderWeb />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Charlie />
          <Check />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>

        <div className="text-center">
          <Checkbox />
        </div>
        <div className="text-center">
          <Charlie />
          <Fail />
        </div>
        <div className="text-center">
          <Checkbox />
        </div>




        <div className="text-center">
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />

        </div>
        <div className="text-center">
          <ExplodingHead />
          <ExplodingHead />
        </div>
        <div className="text-center">
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
       
        </div>

     
    </div>
  );
};

export default SonderpunkteColumn;
