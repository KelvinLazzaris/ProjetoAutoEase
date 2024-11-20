import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

export default function EditRecord() {
    const router = useRouter();
    const { id } = router.query;

    // Estado do registro a ser editado
    const [registro, setRegistro] = useState({
        dataRegistro: "",
        doenca: "",
        medicamento: "",
        alimentacao: "",
        fatorAmbiental: "",
        horasDormidas: "",
        qualidadeSono: "",
        atividadeFisica: false,
        tempoAtividade: "",
        observacoes: "",
        teveCrise: false,
        duracaoCrise: "",
        sintomasCrise: "",
        sintomas: [{ nome: "", intensidade: "", horario: "", frequencia: "" }],
    });

    // Simular busca de registro para edição
    useEffect(() => {
        if (id) {
        const mockRegistro = {
            dataRegistro: "2024-11-20",
            doenca: "Lúpus",
            medicamento: "Medicamento A",
            alimentacao: "Frutas e vegetais",
            fatorAmbiental: "Clima seco",
            horasDormidas: "8",
            qualidadeSono: "Boa",
            atividadeFisica: true,
            tempoAtividade: "30 minutos",
            observacoes: "Dia tranquilo",
            teveCrise: true,
            duracaoCrise: "2 horas",
            sintomasCrise: "Febre, dor de cabeça",
            sintomas: [
            { nome: "Febre", intensidade: "Alta", horario: "10:00", frequencia: "2 vezes" },
            ],
        };
        setRegistro(mockRegistro);
        }
    }, [id]);

    const handleChange = (field, value) => {
        setRegistro({ ...registro, [field]: value });
    };

    const handleSymptomChange = (index, field, value) => {
        const newSymptoms = [...registro.sintomas];
        newSymptoms[index][field] = value;
        setRegistro({ ...registro, sintomas: newSymptoms });
    };

    const handleAddSymptom = () => {
        setRegistro({
        ...registro,
        sintomas: [...registro.sintomas, { nome: "", intensidade: "", horario: "", frequencia: "" }],
        });
    };

    const handleRemoveSymptom = (index) => {
        const newSymptoms = [...registro.sintomas];
        newSymptoms.splice(index, 1);
        setRegistro({ ...registro, sintomas: newSymptoms });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Edição salva:", registro);
        alert("Edição salva com sucesso!");
        router.push("/history");
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
        <header className="bg-gray-800 text-white shadow-md py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
                <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
            </div>
            </div>
        </header>

        <main className="flex-grow py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Editar Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Data do Registro */}
                <div>
                <label htmlFor="dataRegistro" className="block text-gray-700 font-semibold mb-2">
                    Data do Registro
                </label>
                <input
                    id="dataRegistro"
                    type="date"
                    value={registro.dataRegistro}
                    onChange={(e) => handleChange("dataRegistro", e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                {/* Doença */}
                <div>
                <label htmlFor="doenca" className="block text-gray-700 font-semibold mb-2">Qual é a sua doença?</label>
                <select
                    id="doenca"
                    value={registro.doenca}
                    onChange={(e) => handleChange("doenca", e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Selecione...</option>
                    <option value="Lúpus">Lúpus</option>
                    <option value="Artrite Reumatoide">Artrite Reumatoide</option>
                    <option value="Psoríase">Psoríase</option>
                </select>
                </div>

                {/* Medicamento */}
                <div>
                <label htmlFor="medicamento" className="block text-gray-700 font-semibold mb-2">Nome do Medicamento</label>
                <input
                    id="medicamento"
                    type="text"
                    value={registro.medicamento}
                    onChange={(e) => handleChange("medicamento", e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>

                {/* Alimentação */}
                <div>
                <label htmlFor="alimentacao" className="block text-gray-700 font-semibold mb-2">Alimentação</label>
                <textarea
                    id="alimentacao"
                    value={registro.alimentacao}
                    onChange={(e) => handleChange("alimentacao", e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                </div>

                {/* Fatores Ambientais */}
                <div>
                    <label htmlFor="fatorAmbiental" className="block text-gray-700 font-semibold mb-2">Fatores Ambientais</label>
                    <select
                        id="fatorAmbiental"
                        value={registro.fatorAmbiental}
                        onChange={(e) =>
                        setFatorAmbiental(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                        <option value="">Selecione...</option>
                        <option value="Chuva">Chuva</option>
                        <option value="Muito calor">Muito calor</option>
                        <option value="Clima seco">Clima seco</option>
                    </select>
                </div>
                {/* Horas de Sono */}
                <div>
                    <label htmlFor="sono" className="block text-gray-700 font-semibold mb-2">Horas dormidas e qualidade do sono</label>
                    <div className="flex gap-4">
                        <input
                        type="time"
                        min="0"
                        placeholder="Horas dormidas"
                        value={registro.horasDormidas}
                        onChange={(e) => setHorasDormidas(e.target.value)}
                        className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                        type="text"
                        placeholder="Qualidade do sono"
                        value={registro.qualidadeSono}
                        onChange={(e) => setQualidadeSono(e.target.value)}
                        className="w-1/2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
                {/* Atividade Física */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Atividade Física</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                        <input
                        type="checkbox" checked={registro.atividadeFisica} onChange={(e) => setAtividadeFisica(e.target.checked)} className="form-checkbox h-5 w-5 text-green-600" /> Sim </label> {registro.atividadeFisica && ( <input type="text" placeholder="Tempo de atividade (em minutos)" value={registro.tempoAtividade} onChange={(e) => setTempoAtividade(e.target.value)} className="w-full px-4 py-2 border rounded focus focus
                        focus
                        " /> )} 
                    </div>
                </div>
                {/* Observações Adicionais */}
                <div>
                <label htmlFor="observacoes" className="block text-gray-700 font-semibold mb-2">
                    Observações Adicionais
                </label>
                <textarea
                    id="observacoes"
                    value={registro.observacoes}
                    onChange={(e) => handleChange("observacoes", e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
                </div>
                {/* Registro de Crise */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Teve Crise?</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={registro.teveCrise}
                        onChange={(e) => setTeveCrise(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-green-600"
                        />
                        Sim
                        </label>
                    </div>
                    {registro.teveCrise && (
                    <div className="mt-4 space-y-4">
                        <div>
                        <label className="block text-gray-700 font-semibold mb-2">Duração da Crise</label>
                        <input
                            type="text"
                            placeholder="Duração (ex: 2 horas)"
                            value={registro.duracaoCrise}
                            onChange={(e) => setDuracaoCrise(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        </div>
                        <div>
                        <label className="block text-gray-700 font-semibold mb-2">Sintomas da Crise</label>
                        <textarea
                            placeholder="Descreva os sintomas da crise"
                            value={registro.sintomasCrise}
                            onChange={(e) => setSintomasCrise(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        ></textarea>
                        </div>
                    </div>
                    )}
                </div>
                {/* Sintomas */}
                <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Sintomas</h3>
                {registro.sintomas.map((sintoma, index) => (
                    <div key={index} className="mb-4">
                    <input
                        type="text"
                        placeholder="Nome do sintoma"
                        value={sintoma.nome}
                        onChange={(e) => handleSymptomChange(index, "nome", e.target.value)}
                        className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex gap-4">
                        <input
                        type="text"
                        placeholder="Intensidade"
                        value={sintoma.intensidade}
                        onChange={(e) => handleSymptomChange(index, "intensidade", e.target.value)}
                        className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                        type="time"
                        placeholder="Horário"
                        value={sintoma.horario}
                        onChange={(e) => handleSymptomChange(index, "horario", e.target.value)}
                        className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                        type="text"
                        placeholder="Frequência"
                        value={sintoma.frequencia}
                        onChange={(e) => handleSymptomChange(index, "frequencia", e.target.value)}
                        className="w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRemoveSymptom(index)}
                        className="text-red-500 text-sm mt-2"
                    >
                        Remover
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSymptom}
                    className="text-blue-500 text-sm"
                >
                    Adicionar Sintoma
                </button>
                </div>

                <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.push("/history")}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                >
                    Voltar ao Histórico
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                >
                    Salvar Edição
                </button>
            </div>
            </form>
            </div>
        </main>

        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0 md:w-1/3">
                <h4 className="text-xl font-semibold mb-4 text-green-400">AutoEase</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                O AutoEase ajuda você a monitorar seus sintomas e identificar fatores externos que afetam sua saúde.
                </p>
            </div>
            <div className="md:w-1/3">
                <h4 className="text-xl font-semibold mb-4 text-green-400">Contato</h4>
                <p className="text-gray-300 flex items-center mb-2"><FaPhone className="mr-2" /> (11) 1234-5678</p>
                <p className="text-gray-300 flex items-center mb-2"><FaEnvelope className="mr-2" /> contato@autoease.com</p>
                <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com/" target="blank" className="text-gray-400 hover:text-green-400 transition"><FaFacebook size={20} /></a>
                <a href="https://www.instagram.com/" target="blank" className="text-gray-400 hover:text-green-400 transition"><FaInstagram size={20} /></a>
                <a href="https://twitter.com/" target="blank" className="text-gray-400 hover:text-green-400 transition"><FaTwitter size={20} /></a>
                <a href="https://www.linkedin.com/" target="blank" className="text-gray-400 hover:text-green-400 transition"><FaLinkedin size={20} /></a>
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
