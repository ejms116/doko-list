'use client'

import { useState } from "react";

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
import { Team } from "./player-column";
import { PlayerData } from "./player-column";

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

const sumData = rowData.reduce(
	(totals, row) => ({
		p1: totals.p1 + row.players[0].score,
		p2: totals.p2 + row.players[1].score,
		p3: totals.p3 + row.players[2].score,
		p4: totals.p4 + row.players[3].score,
		p5: totals.p5 + row.players[4].score,
	}),
	{ p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 }
)

const ansagenData: AnsagenColumnProps[] = [
	{title: 'Ansagen'},
	{title: 'Vorab'},
]




export default function SessionPage({ params }: {
	params: {
		groupId: string,
		sessionId: string
	}
}) {
	const [gameDetailOpen, setGameDetailOpen] = useState(false)

	const [players, setPlayers] = useState<PlayerData[]>(() => {
		const initialPlayers: PlayerData[] = [
			{ id: 1, name: 'Yannick', team: Team.None },
			{ id: 2, name: 'Daniel', team: Team.Contra },
			{ id: 3, name: 'Hendrik', team: Team.Contra },
			{ id: 4, name: 'Matze', team: Team.Re },
			{ id: 5, name: 'Erik', team: Team.Re },
		]
	
		return initialPlayers;
	  });

	// const addPlayer = (player: PlayerData) => {
	// 	setPlayers((prevPlayers) => [...prevPlayers, player]);
	// };

	// const changePlayerTeam = (id: number, newTeam: Team) => {
	// 	setPlayers((prevPlayers) =>
	// 	  prevPlayers.map((player) =>
	// 		player.id === id ? { ...player, team: newTeam } : player
	// 	  )
	// 	);
	// };

	const playerData: PlayerColumnProps = {
		player: players,
	}

	return (
		<div className="overflow-x-auto">
			<h1>GroupId: {params.groupId}, SessionId: {params.sessionId} </h1>
			<h1>List games...</h1>
			<div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
				<h1 className="text-2xl font-bold mb-4 text-white">Styled Table in Dark Mode</h1>
				<table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
					<thead>
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Game</th>
							<th className="py-3 px-6 text-left">Yannick</th>
							<th className="py-3 px-6 text-left">Daniel</th>
							<th className="py-3 px-6 text-left">Hendrik</th>
							<th className="py-3 px-6 text-left">Matze</th>
							<th className="py-3 px-6 text-left">Erik</th>
							<th className="py-3 px-6 text-left">Spieltyp</th>
							<th className="py-3 px-6 text-left">Sieger</th>
							<th className="py-3 px-6 text-left">Ergebnis</th>
							<th className="py-3 px-6 text-left" colSpan={2}>Ansagen</th>
							<th className="py-3 px-6 text-left" colSpan={2}>Sonderpunkte</th>
							<th className="py-3 px-6 text-left" >Action</th>
						</tr>
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left"></th>
							<GreenRedCellSum score={sumData.p1} />
							<GreenRedCellSum score={sumData.p2} />
							<GreenRedCellSum score={sumData.p3} />
							<GreenRedCellSum score={sumData.p4} />
							<GreenRedCellSum score={sumData.p5} />
							<th className="py-3 px-6 text-left"></th>
							<th className="py-3 px-6 text-left"></th>
							<th className="py-3 px-6 text-left"></th>
							<th className="py-3 px-6 text-left" >Re</th>
							<th className="py-3 px-6 text-left" >Contra</th>
							<th className="py-3 px-6 text-left" >Re</th>
							<th className="py-3 px-6 text-left" >Contra</th>
							<th className="py-3 px-6 text-left" ></th>
						</tr>
					</thead>
					<tbody className="text-gray-300 text-sm">
						{rowData.map((row, index) =>
							<GameRow key={row.id} data={row} setOpen={setGameDetailOpen} />
						)}
					</tbody>
				</table>
			</div>
			<Modal open={gameDetailOpen} onClose={() => setGameDetailOpen(false)}>
				<div className="grid grid-cols-5 gap-3 bg-[#2A2A3C] p-4 rounded-lg shadow-md text-gray-200">
					{/* Headers */}
					<PlayerColumn data={players} setPlayers={setPlayers} />
					<ResultColumn />
					<AnsagenColumn data={ansagenData[0]} />
					<AnsagenColumn data={ansagenData[1]} />
	
					<SonderpunkteColumn />
		
				</div>

			</Modal>
		</div>

	);
}