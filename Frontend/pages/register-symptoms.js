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

export default function RegisterSymptoms() {
  const [medicines, setMedicines] = useState([]);
  const [environmentalFactors, setEnvironmentalFactors] = useState([]);
  const [intensities, setIntensities] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedFactor, setSelectedFactor] = useState("");
  const [hoursSlept, setHoursSlept] = useState("");
  const [physicalActivityHours, setPhysicalActivityHours] = useState("");
  const [food, setFood] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [crisis, setCrisis] = useState(false);
  const [crisisDuration, setCrisisDuration] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (!storedToken) {
        router.push("/unauthorized");
        return;
      }

      const { token, expiryDate } = JSON.parse(storedToken);
      if (new Date().getTime() > expiryDate) {
        localStorage.removeItem("authToken");
        alert("Sua sessão expirou. Faça login novamente.");
        router.push("/unauthorized");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      try {
        const medicinesResponse = await axios.get(
          "http://127.0.0.1:8180/api/medicines/",
          { headers }
        );
        const factorsResponse = await axios.get(
          "http://127.0.0.1:8180/api/environmental-factors/",
          { headers }
        );
        const intensitiesResponse = await axios.get(
          "http://127.0.0.1:8180/api/intensities/",
          { headers }
        );
        setMedicines(medicinesResponse.data);
        setEnvironmentalFactors(factorsResponse.data);
        setIntensities(intensitiesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        if (error.response && error.response.status === 401) {
          router.push("/unauthorized");
        } else {
          alert("Erro ao carregar dados. Tente novamente.");
        }
      }
    };

    fetchData();
  }, [router]);

  const handleAddSymptom = () => {
    setSymptoms([
      ...symptoms,
      { symptomId: "", timeRange: "", occurrences: "", intensityId: "" },
    ]);
  };

  const handleRemoveSymptom = (index) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

  const handleSymptomChange = (index, field, value) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index][field] = value;
    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const storedToken = localStorage.getItem("authToken");
  
    if (!storedToken) {
      router.push("/unauthorized");
      return;
    }
  
    const { token } = JSON.parse(storedToken);
  
    const payload = {
      medicines: selectedMedicine ? [parseInt(selectedMedicine)] : [],
      food,
      environmentalFactors: selectedFactor ? [parseInt(selectedFactor)] : [],
      hoursSlept: parseFloat(hoursSlept),
      physicalActivityHours: parseFloat(physicalActivityHours),
      additionalInfo,
      crisis,
      crisisDuration: crisis ? parseInt(crisisDuration, 10) : 0,
      symptoms: symptoms.map((symptom) => ({
        symptomId: parseInt(symptom.symptomId, 10),
        timeRange: symptom.timeRange,
        occurrences: parseInt(symptom.occurrences, 10),
        intensityId: parseInt(symptom.intensityId, 10),
      })),
    };
  
    try {
      await axios.post("http://127.0.0.1:8180/api/records/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Registro salvo com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Tratamento de erro nos campos
        alert("Erro ao salvar registro. Verifique os campos e tente novamente.");
      } else {
        // Outros erros, como falha na conexão ou no servidor
        alert("Erro ao salvar registro. Tente novamente mais tarde.");
      }
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
          onClick={() => {
            localStorage.removeItem("authToken");
            router.push("/login");
          }}
          className="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-500 transition"
        >
          Deslogar
        </button>
      </header>
      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Registrar Sintomas
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Medicamentos */}
            <div>
              <label htmlFor="medicine" className="block font-semibold">
                Medicamentos
              </label>
              <select
                id="medicine"
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Selecione o medicamento</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Alimentação */}
            <div>
              <label htmlFor="food" className="block font-semibold">
                Alimentação
              </label>
              <textarea
                id="food"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Ex.: Macarrão, Alface"
              ></textarea>
            </div>

            {/* Fatores Ambientais */}
            <div>
              <label htmlFor="factors" className="block font-semibold">
                Fatores Ambientais
              </label>
              <select
                id="factors"
                value={selectedFactor}
                onChange={(e) => setSelectedFactor(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Selecione um fator ambiental</option>
                {environmentalFactors.map((factor) => (
                  <option key={factor.id} value={factor.id}>
                    {factor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Horas Dormidas */}
            <div>
              <label htmlFor="hoursSlept" className="block font-semibold">
                Horas Dormidas
              </label>
              <input
                type="number"
                id="hoursSlept"
                value={hoursSlept}
                onChange={(e) => setHoursSlept(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Ex.: 7"
              />
            </div>

            {/* Atividade Física */}
            <div>
              <label htmlFor="physicalActivityHours" className="block font-semibold">
                Horas de Atividade Física
              </label>
              <input
                type="number"
                step="0.1"
                id="physicalActivityHours"
                value={physicalActivityHours}
                onChange={(e) => setPhysicalActivityHours(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Ex.: 1.5"
              />
            </div>

            {/* Informações Adicionais */}
            <div>
              <label htmlFor="additionalInfo" className="block font-semibold">
                Informações Adicionais
              </label>
              <textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Ex.: Me senti bem"
              ></textarea>
            </div>

            {/* Crise */}
            <div>
              <label className="block font-semibold">Teve Crise?</label>
              <input
                type="checkbox"
                checked={crisis}
                onChange={(e) => setCrisis(e.target.checked)}
              />
              {crisis && (
                <div>
                  <label htmlFor="crisisDuration" className="block font-semibold mt-4">
                    Duração da Crise (minutos)
                  </label>
                  <input
                    type="number"
                    id="crisisDuration"
                    value={crisisDuration}
                    onChange={(e) => setCrisisDuration(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Ex.: 30"
                  />
                </div>
              )}
            </div>

            {/* Sintomas */}
            <div>
              <h3 className="font-semibold">Sintomas</h3>
              {symptoms.map((symptom, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nome do Sintoma"
                    value={symptom.symptomId}
                    onChange={(e) =>
                      handleSymptomChange(index, "symptomId", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Horário (Ex.: 09:00-10:00)"
                    value={symptom.timeRange}
                    onChange={(e) =>
                      handleSymptomChange(index, "timeRange", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Frequência"
                    value={symptom.occurrences}
                    onChange={(e) =>
                      handleSymptomChange(index, "occurrences", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                  <select
                    value={symptom.intensityId}
                    onChange={(e) =>
                      handleSymptomChange(index, "intensityId", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Selecione a intensidade</option>
                    {intensities.map((intensity) => (
                      <option key={intensity.id} value={intensity.id}>
                        {intensity.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSymptom(index)}
                    className="text-red-500"
                  >
                    Remover Sintoma
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSymptom}
                className="text-blue-500 mt-2"
              >
                Adicionar Sintoma
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition"
              >
                Voltar ao Dashboard
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition"
              >
                Registrar
              </button>
            </div>
          </form>
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
