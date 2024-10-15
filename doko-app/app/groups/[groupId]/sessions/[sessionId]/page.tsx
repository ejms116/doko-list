import GameRow from "./game-row";

const array = [...Array(100)]

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
							<th className="py-3 px-6 text-left">Yannick</th>
							<th className="py-3 px-6 text-left">Daniel</th>
							<th className="py-3 px-6 text-left">Hendrik</th>
							<th className="py-3 px-6 text-left">Matze</th>
							<th className="py-3 px-6 text-left">Erik</th>
							<th className="py-3 px-6 text-left">Spieltyp</th>
							<th className="py-3 px-6 text-left">Sieger</th>
							<th className="py-3 px-6 text-left">Ergebnis</th>
							<th className="py-3 px-6 text-left col-span-2">Ansagen</th>
							<th className="py-3 px-6 text-left col-span-2">Sonderpunkte</th>
						</tr>
					</thead>
					<tbody className="text-gray-300 text-sm">
						{array.map((item, index) =>
							<GameRow key={index} name="row.name" age="7" email="🚀row.email" />
						)}

					</tbody>
				</table>
			</div>
		</div>
	);
}