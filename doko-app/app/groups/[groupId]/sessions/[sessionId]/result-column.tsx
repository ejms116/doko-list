import React from 'react';

import { useState } from 'react';

const ResultColumn: React.FC = () => {
    const values = [90, 60, 30, 0];
    const [winner, setWinner] = useState(0); // 0 nobody, 1 Re, 2 Contra
    const [winValue, setWinValue] = useState(120);

    const setStates = (win: number, winnerValue: number) => {
        
        if (winnerValue == winValue && win == winner){
            setWinValue(winnerValue + 30)
        } else {
            setWinValue(winnerValue);
        }
        setWinner(win);
        
    }


    return (
        <div className="grid grid-cols-2 ">
            {/* Header for Result */}
            <div className="col-span-2 text-lg font-bold text-center">Result</div>
            <div>
                {/* Subheader */}
                <div className="text-center">
                    <button className={`${winner == 1 ? 'bg-green-500' : winner == 2 ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md`} onClick={() => setStates(1, 120)}>
                        Re
                    </button>
                </div>


                {/* Result values */}
                {values.map((value, index) => (
                    <div className="text-center">
                        <button className={`${winner == 1 && winValue <= value ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md`} onClick={() => setStates(1, value)}>
                            {value}
                        </button>
                    </div>
                ))}

            </div>
            <div>
                <div className="text-center">
                    <button className={`${winner == 2 ? 'bg-green-500' : winner == 1 ? 'bg-red-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md`} onClick={() => setStates(2, 120)}>
                        Contra
                    </button>
                </div>
                {/* Result values */}
                {values.map((value, index) => (
                    <div className="text-center">
                        <button className={`${winner == 2 && winValue <= value ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-2 py-1 rounded-md`} onClick={() => setStates(2, value)}>
                            {value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultColumn;
