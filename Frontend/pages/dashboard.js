import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

// Registro dos componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter();

  // Função para obter os últimos 6 meses dinamicamente
  const getLastSixMonths = () => {
    const months = [];
    const now = new Date(); // Data atual
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(
        month.toLocaleString("default", { month: "short" }) // Nome curto do mês (Ex: Jan, Feb)
      );
    }
    return months;
  };

  // Dados fictícios simulando registros para os últimos 6 meses
  const data = {
    labels: getLastSixMonths(),
    datasets: [
      {
        label: "Registros Feitos",
        data: [5, 10, 3, 7, 9, 6], // Substituir pelos dados reais ao integrar com o backend
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Verde AutoEase
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Registros nos Últimos 6 Meses",
      },
    },
  };

  const handleRegisterSymptoms = () => {
    router.push("/register-symptoms");
  };

  const handleViewHistory = () => {
    router.push("/history");
  };

  const handleGenerateReports = () => {
    router.push("/generate-reports");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Cabeçalho */}
      <header className="bg-gray-800 text-white shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              src="/images/logo-health.png"
              alt="Logo AutoEase"
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          {/* Título centralizado */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Dashboard
          </h2>

          <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:gap-8">
            {/* Botões Laterais */}
            <div className="space-y-4 mb-8 lg:mb-0">
              <button
                onClick={handleRegisterSymptoms}
                className="bg-green-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-green-500 transition w-full"
              >
                Registrar Sintomas
              </button>
              <button
                onClick={handleViewHistory}
                className="bg-green-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-green-500 transition w-full"
              >
                Ver Histórico
              </button>
              <button
                onClick={handleGenerateReports}
                className="bg-green-600 text-white py-2 px-3 rounded-md font-semibold hover:bg-green-500 transition w-full"
              >
                Gerar Relatórios
              </button>
            </div>

            {/* Gráfico ao lado */}
            <div className="w-full lg:w-3/4 h-80 bg-gray-200 rounded-md">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">
              AutoEase
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
            O AutoEase ajuda você a monitorar seus sintomas e identificar fatores externos que afetam sua saúde, fornecendo uma plataforma prática e acessível para acompanhar seu bem-estar.
            </p>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">Contato</h4>
            <p className="text-gray-300 flex items-center mb-2">
              <FaPhone className="mr-2" /> (11) 1234-5678
            </p>
            <p className="text-gray-300 flex items-center mb-2">
              <FaEnvelope className="mr-2" /> contato@autoease.com
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/"
                target="blank"
                className="text-gray-400 hover:text-green-400 transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="blank"
                className="text-gray-400 hover:text-green-400 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://twitter.com/"
                target="blank"
                className="text-gray-400 hover:text-green-400 transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="blank"
                className="text-gray-400 hover:text-green-400 transition"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AutoEase. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
