import React from 'react';

import { Dulle, Fuchs, Charlie, Check, Fail, End, SpiderWeb, DoubleExlamationMark, ExplodingHead, Plus, Minus, Checkbox } from '../../../../ui/cards';

import { Party, PARTY } from '../../../../models/general/Constants';

interface SonderpunkteColumnProps {
  reFuchsGefangen: boolean[];
  setReFuchsGefangen: React.Dispatch<React.SetStateAction<boolean[]>>;
  contraFuchsGefangen: boolean[];
  setContraFuchsGefangen: React.Dispatch<React.SetStateAction<boolean[]>>;

  reDoppelkopf: boolean[];
  setReDoppelkopf: React.Dispatch<React.SetStateAction<boolean[]>>;
  contraDoppelkopf: boolean[];
  setContraDoppelkopf: React.Dispatch<React.SetStateAction<boolean[]>>;

  fuchsjagdGeschafft: Party;
  setFuchsjagdGeschafft: React.Dispatch<React.SetStateAction<Party>>;
  fuchsjagdFehlgeschlagen: Party;
  setFuchsjagdFehlgeschlagen: React.Dispatch<React.SetStateAction<Party>>;
  fuchsAmEnd: Party;
  setFuchsAmEnd: React.Dispatch<React.SetStateAction<Party>>;
  dulleGefangen: Party;
  setDulleGefangen: React.Dispatch<React.SetStateAction<Party>>;
  charlie: Party;
  setCharlie: React.Dispatch<React.SetStateAction<Party>>;
  charlieGefangen: Party[];
  setCharlieGefangen: React.Dispatch<React.SetStateAction<Party[]>>;
}

const SonderpunkteColumn: React.FC<SonderpunkteColumnProps> = (
  { reFuchsGefangen, setReFuchsGefangen, contraFuchsGefangen, setContraFuchsGefangen,
    fuchsjagdGeschafft, setFuchsjagdGeschafft, fuchsjagdFehlgeschlagen, setFuchsjagdFehlgeschlagen, fuchsAmEnd, setFuchsAmEnd,
    dulleGefangen, setDulleGefangen, charlie, setCharlie, charlieGefangen, setCharlieGefangen,
    reDoppelkopf, setReDoppelkopf, contraDoppelkopf, setContraDoppelkopf }
) => {

  const toggleBool = (index: number, setState: React.Dispatch<React.SetStateAction<boolean[]>>) => {
    setState(prevState =>
      prevState.map((value, i) => (i === index ? !value : value))
    );
  };

  const updateParty = (currentParty: Party, otherParty: Party, setState: React.Dispatch<React.SetStateAction<Party>>) => {
    if (currentParty === otherParty) {
      setState(PARTY.Inaktiv);
    } else {
      setState(otherParty);
    }
  }

  const updatePartyIndex = (currentParty: Party, otherParty: Party, setState: React.Dispatch<React.SetStateAction<Party[]>>, index: number) => {
    if (currentParty === otherParty) {
      setState((prevArray) =>
        prevArray.map((party, i) => (i === index ? PARTY.Inaktiv : party))
      );
    } else {
      setState((prevArray) =>
        prevArray.map((party, i) => (i === index ? otherParty : party))
      );
    }
  }

  return (
    <div className="grid grid-cols-3 grid-flow-row">
      {/* Header for Sonderpunkte */}
      <div className="col-span-3 text-base font-bold text-center">Sonderpunkte</div>

      {/* Subheader */}
      <div className="text-center">Re</div>
      <div className="text-center"></div>
      <div className="text-center">Contra</div>

      {/* Empty fields for Sonderpunkte */}

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={reDoppelkopf[0]} updateCheckbox={() => toggleBool(0, setReDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={reDoppelkopf[1]} updateCheckbox={() => toggleBool(1, setReDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={reDoppelkopf[2]} updateCheckbox={() => toggleBool(2, setReDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={reDoppelkopf[3]} updateCheckbox={() => toggleBool(3, setReDoppelkopf)} />


      </div>
      <div className="text-center">
        <ExplodingHead />
        <ExplodingHead />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={contraDoppelkopf[0]} updateCheckbox={() => toggleBool(0, setContraDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={contraDoppelkopf[1]} updateCheckbox={() => toggleBool(1, setContraDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={contraDoppelkopf[2]} updateCheckbox={() => toggleBool(2, setContraDoppelkopf)} />
        <Checkbox isDisabled={false} isChecked={contraDoppelkopf[3]} updateCheckbox={() => toggleBool(3, setContraDoppelkopf)} />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={reFuchsGefangen[0]} updateCheckbox={() => toggleBool(0, setReFuchsGefangen)} />
        <Checkbox isDisabled={false} isChecked={reFuchsGefangen[1]} updateCheckbox={() => toggleBool(1, setReFuchsGefangen)} />

      </div>
      <div className="text-center">
        <Fuchs />
        <SpiderWeb />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={contraFuchsGefangen[0]} updateCheckbox={() => toggleBool(0, setContraFuchsGefangen)} />
        <Checkbox isDisabled={false} isChecked={contraFuchsGefangen[1]} updateCheckbox={() => toggleBool(1, setContraFuchsGefangen)} />

      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsjagdGeschafft === PARTY.Re}
          updateCheckbox={() => updateParty(fuchsjagdGeschafft, PARTY.Re, setFuchsjagdGeschafft)}
        />
      </div>
      <div className="text-center">
        <Fuchs />
        <Fuchs />
        <Check />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsjagdGeschafft === PARTY.Contra}
          updateCheckbox={() => updateParty(fuchsjagdGeschafft, PARTY.Contra, setFuchsjagdGeschafft)}
        />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsjagdFehlgeschlagen === PARTY.Re}
          updateCheckbox={() => updateParty(fuchsjagdFehlgeschlagen, PARTY.Re, setFuchsjagdFehlgeschlagen)}
        />
      </div>
      <div className="text-center">
        <Fuchs />
        <Fuchs />
        <Fail />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsjagdFehlgeschlagen === PARTY.Contra}
          updateCheckbox={() => updateParty(fuchsjagdFehlgeschlagen, PARTY.Contra, setFuchsjagdFehlgeschlagen)}
        />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsAmEnd === PARTY.Re}
          updateCheckbox={() => updateParty(fuchsAmEnd, PARTY.Re, setFuchsAmEnd)}
        />
      </div>
      <div className="text-center">
        <Fuchs />
        <End />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={fuchsAmEnd === PARTY.Contra}
          updateCheckbox={() => updateParty(fuchsAmEnd, PARTY.Contra, setFuchsAmEnd)}
        />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={dulleGefangen === PARTY.Re}
          updateCheckbox={() => updateParty(dulleGefangen, PARTY.Re, setDulleGefangen)}
        />
      </div>
      <div className="text-center">
        <Dulle />
        <SpiderWeb />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={dulleGefangen === PARTY.Contra}
          updateCheckbox={() => updateParty(dulleGefangen, PARTY.Contra, setDulleGefangen)}
        />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={charlie === PARTY.Re}
          updateCheckbox={() => updateParty(charlie, PARTY.Re, setCharlie)}
        />
      </div>
      <div className="text-center">
        <Charlie />
        <Check />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={charlie === PARTY.Contra}
          updateCheckbox={() => updateParty(charlie, PARTY.Contra, setCharlie)}
        />
      </div>

      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={charlieGefangen[0] === PARTY.Re}
          updateCheckbox={() => updatePartyIndex(charlieGefangen[0], PARTY.Re, setCharlieGefangen, 0)}
        />
        <Checkbox isDisabled={false} isChecked={charlieGefangen[1] === PARTY.Re}
          updateCheckbox={() => updatePartyIndex(charlieGefangen[1], PARTY.Re, setCharlieGefangen, 1)}
        />
      </div>
      <div className="text-center">
        <Charlie />
        <Fail />
      </div>
      <div className="text-center">
        <Checkbox isDisabled={false} isChecked={charlieGefangen[0] === PARTY.Contra}
          updateCheckbox={() => updatePartyIndex(charlieGefangen[0], PARTY.Contra, setCharlieGefangen, 0)}
        />

        <Checkbox isDisabled={false} isChecked={charlieGefangen[1] === PARTY.Contra}
          updateCheckbox={() => updatePartyIndex(charlieGefangen[1], PARTY.Contra, setCharlieGefangen, 1)}
        />
      </div>
    </div>
  );
};

export default SonderpunkteColumn;
