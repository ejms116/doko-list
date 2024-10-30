

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const NewSessionPage = async ({ params }: {
    params: { groupId: string }
}) => {


    return (
        <div className="min-h-screen bg-[#1E1E2C] text-gray-200 p-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-300">Neuen Abend erstellen</h2>

                <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Erstellen & Abend öffnen
                </button>

            </div>
        </div>
    );
}

export default NewSessionPage;