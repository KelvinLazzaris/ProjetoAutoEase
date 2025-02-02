import { useRouter } from "next/router";
import {
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Verifica e recupera o token do localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const { token, expiryDate } = JSON.parse(storedToken);
      // Verifica se o token expirou
      if (new Date().getTime() > expiryDate) {
        localStorage.removeItem("authToken");
        router.push("/unauthorized"); // Redireciona para o login
      } else {
        setToken(token); // Armazena o token no estado local
      }
    } else {
      router.push("/unauthorized"); // Redireciona para o login
    }
  }, [router]);

  // Mensagem enquanto valida o token
  if (!token) {
    return <div>Carregando...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Você foi deslogado.");
    router.push("/login");
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
          className="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-500 transition"
        >
          Deslogar
        </button>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Dashboard
          </h2>

          <div className="space-y-4">
            <button
              onClick={handleRegisterSymptoms}
              className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-500 transition w-full"
            >
              Registrar Sintomas
            </button>
            {/*<button
              onClick={handleViewHistory}
              className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-500 transition w-full"
            >
              Ver Histórico
            </button>*/}
            <button
              onClick={handleGenerateReports}
              className="bg-green-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-500 transition w-full"
            >
              Gerar Relatórios
            </button>
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
