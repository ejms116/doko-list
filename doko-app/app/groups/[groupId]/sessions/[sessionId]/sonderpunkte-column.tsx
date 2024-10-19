import React from 'react';

import { Dulle, Fuchs, Charlie, Check, Fail, End, SpiderWeb, DoubleExlamationMark, ExplodingHead, Plus, Minus } from '../../../../ui/cards';

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
      <React.Fragment>



        <div className="text-center">a</div>
        <div className="text-center">
          <Fuchs />
          <SpiderWeb />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Fuchs />
          <Fuchs />
          <Check />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Fuchs />
          <Fuchs />
          <Fail />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Fuchs />
          <End />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Dulle />
          <SpiderWeb />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Charlie />
          <Check />
        </div>
        <div className="text-center">b</div>

        <div className="text-center">a</div>
        <div className="text-center">
          <Charlie />
          <Fail />
        </div>
        <div>sd</div>
     

        <div className="text-center">
          <Plus />
          <span>0</span>
          <Minus />
        </div>
        <div className="text-center">
          <ExplodingHead />
          <ExplodingHead />
        </div>
        <div className="text-center">
          <Plus />
          <span>0</span>
          <Minus />
        </div>

      </React.Fragment>
    </div>
  );
};

export default SonderpunkteColumn;
