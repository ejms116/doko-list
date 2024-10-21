interface GreenRedCellSpanProps {
    score: number; // The score prop to be passed in
}

const GreenRedCellSpan: React.FC<GreenRedCellSpanProps> = ({ score }) => {
    return (
        <span 
            className={`py-1 px-3 text-center ${score > 0
                    ? 'text-green-500'  // Green text if positive
                    : score < 0
                        ? 'text-red-500'    // Red text if negative
                        : ''                // Default text color if zero
                }`}
        >
            {score}
        </span>
    )
}

export default GreenRedCellSpan;