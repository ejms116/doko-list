interface GreenRedCellProps {
    score: number; // The score prop to be passed in
}

const GreenRedCellSum: React.FC<GreenRedCellProps> = ({ score }) => {
    return (
        <th 
            className={`py-3 px-6 text-center text-lg ${score > 0
                    ? 'text-green-500'  // Green text if positive
                    : score < 0
                        ? 'text-red-500'    // Red text if negative
                        : ''                // Default text color if zero
                }`}
        >
            {score}
        </th>
    )
}

export default GreenRedCellSum;