import React from 'react';

import { useState } from 'react';

import { PARTY, Party } from '../../../../models/general/Constants';

interface ResultColumnProps {
    resultParty: Party;
    setResultParty: React.Dispatch<React.SetStateAction<Party>>;
    resultValue: number;
    setResultValue: React.Dispatch<React.SetStateAction<number>>;
}

const ResultColumn: React.FC<ResultColumnProps> = ({ resultParty, setResultParty, resultValue, setResultValue }) => {
    const values = [90, 60, 30, 0];

    const setStates = (win: Party, winnerValue: number) => {
        
        if (winnerValue == resultValue && win == resultParty){
            setResultValue(winnerValue + 30)
        } else {
            setResultValue(winnerValue);
        }
        setResultParty(win);
        
    }


    return (
        <div className="grid grid-cols-2">
            {/* Header for Result */}
            <div className="col-span-2 text-base font-bold text-center">Ergebnis</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div>
            <div>
                {/* Subheader */}
                <div className="text-center">
                    <button className={`${resultParty == PARTY.Re ? 'bg-green-500' : resultParty  == PARTY.Contra ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Re, 120)}>
                        Re
                    </button>
                </div>


                {/* Result values */}
                {values.map((value, index) => (
                    <div key={index} className="text-center">
                        <button className={`${resultParty  == PARTY.Re && resultValue <= value ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Re, value)}>
                            {value}
                        </button>
                    </div>
                ))}

            </div>
            <div>
                <div className="text-center">
                    <button className={`${resultParty  == PARTY.Contra ? 'bg-green-500' : resultParty  == PARTY.Re ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Contra, 120)}>
                        Co
                    </button>
                </div>
                {/* Result values */}
                {values.map((value, index) => (
                    <div key={index} className="text-center">
                        <button className={`${resultParty  == PARTY.Contra && resultValue <= value ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Contra, value)}>
                            {value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultColumn;
