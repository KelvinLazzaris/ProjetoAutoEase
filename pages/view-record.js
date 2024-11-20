import { useRouter } from "next/router";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ViewRecord() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID do registro pela URL

  // Simulação de dados (Substituir pela integração com backend futuramente)
  const registros = [
    {
      id: "1",
      data: "2024-11-20",
      doenca: "Lúpus",
      medicamento: "Prednisona",
      alimentacao: "Salada, arroz e carne.",
      fatorAmbiental: "Muito calor",
      horasDormidas: "8",
      qualidadeSono: "Boa",
      atividadeFisica: "30 minutos de caminhada",
      observacoes: "Nenhuma observação.",
      teveCrise: true,
      duracaoCrise: "2 horas",
      sintomasCrise: "Febre e dor nas articulações.",
      sintomas: [{ nome: "Febre", intensidade: "Alta", horario: "12:00", frequencia: "2 vezes" }],
    },
    {
      id: "2",
      data: "2024-11-19",
      doenca: "Artrite Reumatoide",
      medicamento: "Metotrexato",
      alimentacao: "Frutas e legumes.",
      fatorAmbiental: "Chuva",
      horasDormidas: "7",
      qualidadeSono: "Razoável",
      atividadeFisica: "Nenhuma",
      observacoes: "Dor leve nos joelhos.",
      teveCrise: false,
      duracaoCrise: "",
      sintomasCrise: "",
      sintomas: [{ nome: "Dores nas articulações", intensidade: "Moderada", horario: "08:00", frequencia: "1 vez" }],
    },
  ];

  const registro = registros.find((r) => r.id === id);

  if (!registro) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
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
        <main className="flex-grow py-12 px-4 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Registro não encontrado.</p>
        </main>
      </div>
    );
  }

  return (
    <div
        className="min-h-screen flex flex-col"
        style={{
            backgroundImage: "url('/images/background.png')",
            backgroundSize: 'cover', // Faz a imagem cobrir o fundo
            backgroundRepeat: 'no-repeat', // Impede repetição
            backgroundPosition: 'center', // Centraliza a imagem no fundo
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

      {/* Conteúdo */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Detalhes do Registro</h2>
          <div className="space-y-4">
            <p><strong>Data:</strong> {registro.data}</p>
            <p><strong>Doença:</strong> {registro.doenca}</p>
            <p><strong>Medicamento:</strong> {registro.medicamento}</p>
            <p><strong>Alimentação:</strong> {registro.alimentacao}</p>
            <p><strong>Fator Ambiental:</strong> {registro.fatorAmbiental}</p>
            <p><strong>Horas Dormidas:</strong> {registro.horasDormidas}</p>
            <p><strong>Qualidade do Sono:</strong> {registro.qualidadeSono}</p>
            <p><strong>Atividade Física:</strong> {registro.atividadeFisica || "Nenhuma"}</p>
            <p><strong>Observações:</strong> {registro.observacoes || "Nenhuma"}</p>
            <p><strong>Teve Crise:</strong> {registro.teveCrise ? "Sim" : "Não"}</p>
            {registro.teveCrise && (
              <>
                <p><strong>Duração da Crise:</strong> {registro.duracaoCrise}</p>
                <p><strong>Sintomas da Crise:</strong> {registro.sintomasCrise}</p>
              </>
            )}
            <div>
              <strong>Sintomas:</strong>
              <ul className="list-disc pl-6">
                {registro.sintomas.map((sintoma, index) => (
                  <li key={index}>
                    {sintoma.nome} - Intensidade: {sintoma.intensidade}, Horário: {sintoma.horario}, Frequência: {sintoma.frequencia}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/history")}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition"
            >
              Voltar ao Histórico
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">AutoEase</h4>
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
              <a href="https://www.facebook.com/" target="blank" className="text-gray-400 hover:text-green-400 transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/" target="blank" className="text-gray-400 hover:text-green-400 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com/" target="blank" className="text-gray-400 hover:text-green-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/" target="blank" className="text-gray-400 hover:text-green-400 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AutoEase. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
