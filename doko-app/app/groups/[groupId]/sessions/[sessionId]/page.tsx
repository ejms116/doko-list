import GameRow from "./game-row";
import { GameRowProps } from "./game-row";
import { PlayerProps } from "./game-row";
import GreenRedCellSum from "../../../../ui/green-red-cell-sum";
import Modal from "../../../../ui/modal";

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


export default function SessionPage({ params }: {
	params: {
		groupId: string,
		sessionId: string
	}
}) {
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
						{ rowData.map((row, index) => 
							<GameRow key={row.id} data={row} />
						) }
					</tbody>
				</table>
			</div>
			<Modal/>
		</div>
		
	);
}