'use client'

import { useState, useEffect, useMemo } from "react";

import GameRow from "./game-row";
import { GameRowProps } from "./game-row";
import { PlayerProps } from "./game-row";
import GreenRedCellSum from "../../../../ui/green-red-cell-sum";
import Modal from "../../../../ui/modal";

import PlayerColumn from "./player-column";
import ResultColumn from "./result-column";
import AnsagenColumn from "./ansagen-column";
import SonderpunkteColumn from "./sonderpunkte-column";

import { AnsagenColumnProps } from "./ansagen-column";
import { PlayerColumnProps } from "./player-column";
import { PlayerData } from "./player-column";

import { PARTY, Party } from "../../../../models/general/Constants";

import { Session } from "../../../../models/general/Session";
import { Game, SeatScores } from "../../../../models/general/Game";

import { Checkbox } from "../../../../ui/cards";
import { SessionPlayer } from "../../../../models/composite/SessionPlayer";

import { SeatScore } from "../../../../models/general/Game";

// DELETE
const rowData: GameRowProps[] = [
	{
		id: 1,
		players: [{ score: 0, party: '-' }, { score: 5, party: 'Re' }, { score: 5, party: 'Re' }, { score: -5, party: 'Contra' }, { score: -5, party: 'Contra' }],
		typ: 'normal', winner: 'Re', result: 'Re90', ansagen_re: '90V,60', ansagen_contra: 'Co', sonderpunkte_re: 'F', sonderpunkte_contra: 'D'
	},
	{
		id: 2,
		players: [{ score: 5, party: 'Re' }, { score: 0, party: '-' }, { score: 5, party: 'Re' }, { score: -5, party: 'Contra' }, { score: -5, party: 'Contra' }],
		typ: 'normal', winner: 'Re', result: 'Re90', ansagen_re: '90V,60', ansagen_contra: 'Co', sonderpunkte_re: 'F', sonderpunkte_contra: 'D'
	},
	{
		id: 3,
		players: [{ score: 5, party: 'Re' }, { score: 5, party: 'Re' }, { score: 0, party: '-' }, { score: -5, party: 'Contra' }, { score: -5, party: 'Contra' }],
		typ: 'normal', winner: 'Re', result: 'Re90', ansagen_re: '90V,60', ansagen_contra: 'Co', sonderpunkte_re: 'F', sonderpunkte_contra: 'D'
	},
	{
		id: 4,
		players: [{ score: 5, party: 'Re' }, { score: 5, party: 'Re' }, { score: -5, party: 'Contra' }, { score: 0, party: '-' }, { score: -5, party: 'Contra' }],
		typ: 'normal', winner: 'Re', result: 'Re90', ansagen_re: '90V,60', ansagen_contra: 'Co', sonderpunkte_re: 'F', sonderpunkte_contra: 'D'
	},
	{
		id: 5,
		players: [{ score: 0, party: 'Re' }, { score: 0, party: 'Re' }, { score: 0, party: 'Contra' }, { score: 0, party: 'Contra' }, { score: 0, party: '-' }],
		typ: 'normal', winner: 'Re', result: 'Re90', ansagen_re: '90V,60', ansagen_contra: 'Co', sonderpunkte_re: 'F', sonderpunkte_contra: 'D'
	},
]

const ansagenData: AnsagenColumnProps[] = [
	{ title: 'Ansagen' },
	{ title: 'Vorab' },
]



// DELETE

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SessionPage = ({ params }: {
	params: {
		groupId: string,
		sessionId: string
	}
}) =>  {
	const [gameDetailOpen, setGameDetailOpen] = useState(false)


	const [sessionData, setSessionData] = useState<Session | null>(null);
	const [gameData, setGameData] = useState<Game[] | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState<unknown>(); // Error state

	useEffect(() => {
        const fetchSessionData = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${apiBaseUrl}/groups/sessions/${params.sessionId}`, {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setSessionData(data);
            } catch (err: unknown) {
				if (err instanceof Error){
					setError(err);
				}
				
				console.log(err);
            } finally {
                setLoading(false); 
            }
        };

		const fetchGameData = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${apiBaseUrl}/groups/sessions/${params.sessionId}/games`, {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setGameData(data);

				console.log(data)
            } catch (err: unknown) {
				if (err instanceof Error){
					setError(err);
				}
				
				console.log(err);
            } finally {
                setLoading(false); 
            }
        };

		fetchSessionData();
        fetchGameData();

    }, [params.sessionId]);

	const processedGameData: GameRowProps[] = useMemo(() => {
        if (!gameData) return [];
        return gameData.map((game) => {

			let ansRe: string = '';
			if (game.ansageReVorab){
				ansRe = 'ReV';
			} else if (game.ansageRe){
				ansRe = 'Re';
			}

			let ansCo: string = '';
			if (game.ansageContraVorab){
				ansCo = 'CoV';
			} else if (game.ansageContra){
				ansCo = 'Co';
			}

			let weitereAns: string = '';

			if (game.ansageVorab !== -1){
				weitereAns = `${game.ansageVorab}V`;
			}

			if (game.ansageVorab == -1 || game.ansage < game.ansageVorab){
				weitereAns = `${weitereAns} ${game.ansage}`;
			}

			if (game.weitereAnsagenParty == PARTY.Re){
				ansRe = `${ansRe} ${weitereAns}`;
			} else if (game.weitereAnsagenParty == PARTY.Contra){
				ansCo = `${ansCo} ${weitereAns}`;
			}


			
    
            const processedGame = {
				...game,
				played: game.played.toLocaleString(),
				ansageRe: ansRe,
				ansageContra: ansCo,
				reWin: game.winParty == PARTY.Re ? true : false,
            };
            return processedGame;
        });
    }, [gameData]);

	
	// const sumData = rowData.reduce(
	// 	(totals, row) => ({
	// 		p1: totals.p1 + row.players[0].score,
	// 		p2: totals.p2 + row.players[1].score,
	// 		p3: totals.p3 + row.players[2].score,
	// 		p4: totals.p4 + row.players[3].score,
	// 		p5: totals.p5 + row.players[4].score,
	// 	}),
	// 	{ p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 }
	// )

	const sumGameData: SeatScore[] = useMemo(() => {
		if (!processedGameData) return [];
		return calculateCumulativeSeatScores(processedGameData)

	}, [processedGameData])

	function calculateCumulativeSeatScores(gameRows: GameRowProps[]): SeatScore[] {
		const cumulativeScores: { [seatNumber: string]: SeatScore } = {};

		gameRows.forEach((gameRow) => {
		
			Object.entries(gameRow.seatScores).forEach(([seatNumber, seatScore]) => {
	
				if (!cumulativeScores[seatNumber]) {
					cumulativeScores[seatNumber] = { score: 0, party: seatScore.party };
				}
			
				cumulativeScores[seatNumber].score += seatScore.score;

			});
		});

		return Object.values(cumulativeScores);
	}

	// DELETE

	const [players, setPlayers] = useState<PlayerData[]>(() => {
		const initialPlayers: PlayerData[] = [
			{ id: 1, name: 'Yannick', party: PARTY.Inaktiv },
			{ id: 2, name: 'Daniel', party: PARTY.Contra },
			{ id: 3, name: 'Hendrik', party: PARTY.Contra },
			{ id: 4, name: 'Matze', party: PARTY.Re },
			{ id: 5, name: 'Erik', party: PARTY.Re },
		]
	
		return initialPlayers;
	});
	
	const playerData: PlayerColumnProps = {
		player: players,
	}

	// DELETE



	

	if (loading) return <p>Loading...</p>;
	if (!sessionData) return <p>Loading session data...</p>;
	if (!gameData) return <p>Loading game data...</p>;
    if (error) return <p>Error</p>;

	const playedDate: Date = new Date(sessionData.played);

	return (
		<div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
			{/* <h1>GroupId: {params.groupId}, SessionId: {params.sessionId} </h1>
			<h1>List games...</h1> */}

			<div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
				<div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
					<h2 className="text-2xl font-semibold text-gray-300">{`Doppelkopf bei ${sessionData.location} am ${playedDate.toLocaleString()}`}</h2>

					<button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
						Neues Spiel hinzufügen
					</button>
				</div>


				<div className="overflow-x-auto">
				<table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
					<thead>
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left"></th>
							<th className="py-3 px-6 text-center"></th>
					
							{sessionData.sessionPlayers.map((sp: SessionPlayer) => {
								return (
									<th key={sp.id.playerId} className="py-3 px-6 text-center">{sp.player.name}</th>
								)
							})}
					
							<th className="py-3 px-6 text-center"></th>
							
							<th className="py-3 px-6 text-center"></th>
							<th className="py-3 px-6 text-center"></th>
							<th className="py-3 px-6 text-center"></th>
						</tr>
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Game</th>
							<th className="py-3 px-6 text-center">Spieltyp</th>
							{Object.entries(sumGameData).map(([seatNumber, seatScore]) => (
								<GreenRedCellSum key={seatNumber} score={seatScore.score} />
							))}
							
							<th className="py-3 px-6 text-center">Ergebnis</th>
							<th className="py-3 px-6 text-center">Ansagen</th>
							<th className="py-3 px-6 text-center">Sonderpunkte</th>
							<th className="py-3 px-6 text-center">Aktion</th>
						</tr>
					</thead>
					<tbody className="text-gray-300 text-sm">
					{processedGameData.map((game: GameRowProps) => {
						return (
							<GameRow key={game.id} game={game} setOpen={setGameDetailOpen} />
						)
					})}
		
					</tbody>
				</table>
				</div>
			</div>

			<Modal open={gameDetailOpen} onClose={() => setGameDetailOpen(false)}>
				<div className='grid py-4'>
					<h1 className='text-lg font-bold py-2'>Neues Spiel hinzufügen</h1>
					<div className='flex place-items-center gap-3'>
						<div className='flex place-items-center gap-3'>
							<span>Spieltyp</span>
							<select
								id="options"
								className="block w-full bg-[#1E1E2C] border border-gray-600 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 max-w-[150px]"
							>
								<option value="normal">Normal</option>
								<option value="solo">Buben Solo</option>
								<option value="solo">Damen Solo</option>
								<option value="solo">Trumpf Solo</option>
								<option value="hochzeit">Hochzeit</option>
								<option value="hochzeit">Hochzeit still</option>

							</select>
						</div>
						<div className='flex place-items-center gap-3'>
							<span>
								Herz rumgegangen?
							</span>
							<input
								type="checkbox"
								className="form-checkbox h-6 w-6 text-blue-500 bg-gray-600 border-gray-500 rounded"
							/>
						</div>
						<div className={`bg-gray-500 text-white font-bold px-2 py-1 rounded-md text-center min-w-[80px]`}>Bock verbleibend: 5</div>
					</div>
				</div>

				

				<div className="grid grid-cols-[auto_auto_auto_auto_auto] gap-4 bg-[#2A2A3C] text-gray-200 items-start">
					{/* Headers */}
					
					<PlayerColumn data={players} setPlayers={setPlayers} />
					<ResultColumn />
					<AnsagenColumn data={ansagenData[0]} />
					<AnsagenColumn data={ansagenData[1]} />

					<SonderpunkteColumn />

				</div>
				<div>
					<ul>
						<li className='text-red-500 text-sm'>Fehler: Anzahl Füchse gefangen größer als 2</li>
						<li className='text-red-500 text-sm'>Fehler: Ansagen passen nicht zu Vorab-Ansagen</li>
					</ul>
				</div>
				<div className='flex justify-end items-end space-x-4'>
					<div className='space-x-4'>
						<button className='bg-blue-600 text-white py-1 px-3 p-2 rounded hover:bg-blue-700'>Eingaben überprüfen</button>
						<button className='bg-blue-600 text-white py-1 px-3 p-2 rounded hover:bg-blue-700'>Spiel hinzufügen</button>

					</div>
				</div>

			</Modal>
		</div>

	);
}

export default SessionPage;