import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;