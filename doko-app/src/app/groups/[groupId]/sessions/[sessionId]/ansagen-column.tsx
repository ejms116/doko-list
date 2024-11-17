import React from 'react';

import { useState } from 'react';
import { PARTY, Party } from '../../../../models/general/Constants';

export interface AnsagenColumnProps {
    title: string;
    ansageRe: boolean;
    setAnsageRe: React.Dispatch<React.SetStateAction<boolean>>;
    ansageContra: boolean;
    setAnsageContra: React.Dispatch<React.SetStateAction<boolean>>;
    weitereAnsagenParty: Party;
    setWeitereAnsagenParty: React.Dispatch<React.SetStateAction<Party>>;
    ansage: number;
    setAnsage: React.Dispatch<React.SetStateAction<number>>;
}

const AnsagenColumn: React.FC<AnsagenColumnProps> = ({ 
    title, ansageRe, setAnsageRe, ansageContra, setAnsageContra, weitereAnsagenParty, setWeitereAnsagenParty, ansage, setAnsage
}) => {
    const values = [90, 60, 30, 0];

    const setAnsageReContra = (re: boolean, contra: boolean) => {
        setAnsageRe(re)
        setAnsageContra(contra)

        if (!re && weitereAnsagenParty == PARTY.Re) {
            setWeitereAnsagenParty(PARTY.Inaktiv);
            setAnsage(120);
        }

        if (!contra && weitereAnsagenParty == PARTY.Contra) {
            setWeitereAnsagenParty(PARTY.Inaktiv);
            setAnsage(120);
        }



    }

    const setStates = (weitereAns: Party, winnerValue: number) => {
        
        if (ansage == winnerValue && weitereAns == weitereAnsagenParty){
            setAnsage(ansage + 30)
            if (winnerValue == 90){
                setWeitereAnsagenParty(PARTY.Inaktiv)
            }
        } else {
            setAnsage(winnerValue);
        }
        setWeitereAnsagenParty(weitereAns)
        
        if (weitereAns == PARTY.Re){
            setAnsageRe(true)
        } else if (weitereAns == PARTY.Contra){
            setAnsageContra(true)
        }
    }


    return (
        <div className="grid grid-cols-2 ">
            {/* Header for Result  &nbsp; */}
            <div className="col-span-2 text-base font-bold text-center">{title}</div>
            <div className="text-center">&nbsp;</div>
            <div className="text-center">&nbsp;</div> 
            <div>
                {/* Subheader */}
                <div className="text-center">
                    <button className={`${ansageRe ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setAnsageReContra(!ansageRe, ansageContra)}>
                        Re
                    </button>
                </div>


                {/* Result values */}
                {values.map((value, index) => (
                    <div key={index} className="text-center">
                        <button className={`${weitereAnsagenParty == PARTY.Re && ansage <= value ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Re, value)}>
                            {value}
                        </button>
                    </div>
                ))}

            </div>
            <div>
                <div className="text-center">
                    <button className={`${ansageContra ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setAnsageReContra(ansageRe, !ansageContra)}>
                        Co
                    </button>
                </div>
                {/* Result values */}
                {values.map((value, index) => (
                    <div key={index} className="text-center">
                        <button className={`${weitereAnsagenParty == PARTY.Contra && ansage <= value ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(PARTY.Contra, value)}>
                            {value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnsagenColumn;
