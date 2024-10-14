import SessionRow from "./session-row";
import { SessionRowProps } from "./session-row";
import GreenRedCell from "../../ui/green-red-cell";

const groups = [
	{
		"id": 1,
		"name": "Wesperados",
		"players": [
			{
				"id": 1,
				"name": "Erik",
				"email": "super@king.com"
			}
		]
	},
	{
		"id": 2,
		"name": "Doko",
		"players": [
			{
				"id": 1,
				"name": "Erik",
				"email": "super@king.com"
			}
		]
	}
]

// Example data
const rowData: SessionRowProps[] = [
	{ date: new Date('2024-10-01'), scores: [-1, 1, 0, 1, -1], location: 'New York' },
	{ date: new Date('2024-10-02'), scores: [7, 7, -7, 0, -7], location: 'Los Angeles' },
	{ date: new Date('2024-10-03'), scores: [10, -10, -10, 10, 0], location: 'Chicago' },
];

const sumData = rowData.reduce(
	(totals, row) => ({
		p1: totals.p1 + row.scores[0],
		p2: totals.p2 + row.scores[1],
		p3: totals.p3 + row.scores[2],
		p4: totals.p4 + row.scores[3],
		p5: totals.p5 + row.scores[4],
	}),
	{ p1: 0, p2: 0, p3: 0, p4: 0, p5: 0 }
)



export default function GroupPage({ params }: {
	params: { groupId: string }
}) {
	return (
		<div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
			<h1 className="text-2xl font-bold mb-4 text-white">Sessions</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto bg-[#2A2A3C] shadow-md rounded-lg">
					<thead>
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Datum</th>
							<th className="py-3 px-6 text-left">Yannick</th>
							<th className="py-3 px-6 text-left">Daniel</th>
							<th className="py-3 px-6 text-left">Hendrik</th>
							<th className="py-3 px-6 text-left">Matze</th>
							<th className="py-3 px-6 text-left">Erik</th>
							<th className="py-3 px-6 text-left">Ort</th>
							<th className="py-3 px-6 text-left">Action</th>
						</tr>
		
						<tr className="bg-[#3B3B4D] text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left"></th>
							<GreenRedCell score={sumData.p1} />
							<GreenRedCell score={sumData.p2} />
							<GreenRedCell score={sumData.p3} />
							<GreenRedCell score={sumData.p4} />
							<GreenRedCell score={sumData.p5} />
							<th className="py-3 px-6 text-left"></th>
							<th className="py-3 px-6 text-left"></th>
						</tr>
						<tr className="border-b border-gray-600">
							<td colSpan={8} className="h-0.5 bg-gray-600"></td>
						</tr>
					</thead>


					<tbody className="text-gray-300 text-sm">
						<SessionRow key="1" data={rowData[0]} />
						<SessionRow key="2" data={rowData[1]} />
						<SessionRow key="3" data={rowData[2]} />

					</tbody>
				</table>
			</div>
		</div>
	);

}