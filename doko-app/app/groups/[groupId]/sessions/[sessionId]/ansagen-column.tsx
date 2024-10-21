import React from 'react';

import { useState } from 'react';

export interface AnsagenColumnProps {
    title: string;
}

const AnsagenColumn: React.FC<{ data: AnsagenColumnProps }> = ({ data }) => {
    const values = [90, 60, 30, 0];

    const [ansageRe, setAnsageRe] = useState(false);
    const [ansageContra, setAnsageContra] = useState(false);
    const [weitereAnsage, setWeitereAnsage] = useState(0); // 0 nobody, 1 Re, 2 Contra
    const [winValue, setWinValue] = useState(120);

    const setAnsageReContra = (re: boolean, contra: boolean) => {
        setAnsageRe(re)
        setAnsageContra(contra)

        if (!re && weitereAnsage == 1) {
            setWeitereAnsage(0)
        }

        if (!contra && weitereAnsage == 2) {
            setWeitereAnsage(0)
        }



    }

    const setStates = (weitereAns: number, winnerValue: number) => {
        
        if (winValue == winnerValue && weitereAns == weitereAnsage){
            setWinValue(winValue + 30)
            if (winnerValue == 90){
                setWeitereAnsage(0)
            }
        } else {
            setWinValue(winnerValue);
        }
        setWeitereAnsage(weitereAns)
        
        if (weitereAns == 1){
            setAnsageRe(true)
        } else if (weitereAns == 2){
            setAnsageContra(true)
        }
    }


    return (
        <div className="grid grid-cols-2 ">
            {/* Header for Result */}
            <div className="col-span-2 text-base font-bold text-center">{data.title}</div>
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
                    <div className="text-center">
                        <button className={`${weitereAnsage == 1 && winValue <= value ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(1, value)}>
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
                    <div className="text-center">
                        <button className={`${weitereAnsage == 2 && winValue <= value ? 'bg-purple-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md min-w-[40px]`} onClick={() => setStates(2, value)}>
                            {value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnsagenColumn;
