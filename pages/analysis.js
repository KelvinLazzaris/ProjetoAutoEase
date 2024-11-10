import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registre as escalas e elementos necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analysis() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Intensidade do Sintoma",
        data: [3, 4, 5, 6, 7],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Análise e Padrões</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <Line data={data} />
      </div>
    </div>
  );
}
