import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
    FaPhone,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
  } from "react-icons/fa";

export default function GenerateReports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [crisisOnly, setCrisisOnly] = useState(false);
  const router = useRouter();

  // Verificar autenticação
  useEffect(() => {
    const token = localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken")).token
      : null;

    if (!token) {
      router.push("/unauthorized");
    }
  }, [router]);

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken")).token
      : null;

    const payload = { from, to, crisisOnly };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8180/api/records/export",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Para receber o relatório como PDF
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório. Tente novamente.");
    }
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
      <header className="bg-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center">
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
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
        >
          Deslogar
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Gerar Relatório
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo "De" */}
            <div>
              <label htmlFor="from" className="block font-semibold">
                De:
              </label>
              <input
                type="date"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            {/* Campo "Até" */}
            <div>
              <label htmlFor="to" className="block font-semibold">
                Até:
              </label>
              <input
                type="date"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            {/* Campo "Apenas Crises" */}
            <div>
              <label htmlFor="crisisOnly" className="block font-semibold">
                Apenas Crises:
              </label>
              <select
                id="crisisOnly"
                value={crisisOnly}
                onChange={(e) => setCrisisOnly(e.target.value === "true")}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>

            {/* Botão de gerar relatório */}
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition"
            >
              Gerar Relatório
            </button>
          </form>

          {/* Botão de voltar ao Dashboard */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">
              AutoEase
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              O AutoEase ajuda você a monitorar seus sintomas e identificar
              fatores externos que afetam sua saúde, fornecendo uma plataforma
              prática e acessível para acompanhar seu bem-estar.
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
