import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function RegistrarTudo() {
  const [doencas, setDoencas] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [fatoresAmbientais, setFatoresAmbientais] = useState([]);
  const [intensidades, setIntensidades] = useState([]);
  const [sintomasLista, setSintomasLista] = useState([]);
  const [formData, setFormData] = useState({
    dataRegistro: "",
    doenca: "",
    medicines: [],
    food: "",
    environmentalFactors: [],
    hoursSlept: "",
    physicalActivityHours: "",
    additionalInfo: "",
    crisis: false,
    crisisDuration: "",
    symptoms: [],
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
          alert('Sessão expirada. Faça login novamente.');
          router.push('/login');
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const [doencasRes, medRes, envRes, intRes, sintomasRes] = await Promise.all([
          axios.get("http://127.0.0.1:8180/api/diseases/", config),
          axios.get("http://127.0.0.1:8180/api/medicines/", config),
          axios.get("http://127.0.0.1:8180/api/environmental-factors/", config),
          axios.get("http://127.0.0.1:8180/api/intensities/", config),
          axios.get("http://127.0.0.1:8180/api/symptoms/", config),
        ]);
        setDoencas(doencasRes.data);
        setMedicamentos(medRes.data);
        setFatoresAmbientais(envRes.data);
        setIntensidades(intRes.data);
        setSintomasLista(sintomasRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados do backend:", error);
        if (error.response && error.response.status === 401) {
          alert("Sessão expirada. Faça login novamente.");
          router.push("/login");
        } else {
          alert("Erro ao carregar os dados. Tente novamente mais tarde.");
        }
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      router.push("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post("http://127.0.0.1:8180/api/records/", formData, config);
      alert("Registro de sintomas salvo com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar registro de sintomas:", error);
      alert("Erro ao salvar registro. Por favor, tente novamente.");
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
      <header className="bg-gray-800 text-white shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
          </div>
        </div>
      </header>

      {/* Formulário */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Registro Completo</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data de Registro */}
            <div>
              <label htmlFor="dataRegistro" className="block text-gray-700 font-semibold mb-2">
                Data do Registro
              </label>
              <input
                id="dataRegistro"
                type="date"
                value={formData.dataRegistro}
                onChange={(e) => handleInputChange("dataRegistro", e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Doença */}
            <div>
              <label htmlFor="doenca" className="block text-gray-700 font-semibold mb-2">
                Doença
              </label>
              <select
                id="doenca"
                value={formData.doenca}
                onChange={(e) => handleInputChange("doenca", e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Selecione...</option>
                {doencas.map((doenca) => (
                  <option key={doenca.id} value={doenca.id}>
                    {doenca.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Outros Campos... */}
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
            >
              Salvar Registro
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
