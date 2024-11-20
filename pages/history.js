import { FaPencilAlt, FaTrash, FaEye, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useState } from "react"; 
import { useRouter } from "next/router"

export default function History() {
    const [registros, setRegistros] = useState([
        {
        id: 1,
        data: "2024-11-20",
        doenca: "Lúpus",
        medicamento: "Prednisona",
        sintomas: [{ nome: "Febre", intensidade: "Alta", horario: "12:00", frequencia: "2 vezes" }],
        },
        {
        id: 2,
        data: "2024-11-19",
        doenca: "Artrite Reumatoide",
        medicamento: "Metotrexato",
        sintomas: [{ nome: "Dores nas articulações", intensidade: "Moderada", horario: "08:00", frequencia: "1 vez" }],
        },
    ]);

    const handleDelete = (id) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este registro?");
        if (confirm) {
        setRegistros(registros.filter((registro) => registro.id !== id));
        alert("Registro excluído com sucesso!");
        }
    };

    const router = useRouter();

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
                onClick={() => (window.location.href = "/")}
            >
                <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
            </div>
            </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-grow py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Histórico de Registros</h2>
            {registros.length > 0 ? (
                <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Data</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Doença</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Medicamento</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro) => (
                    <tr key={registro.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{registro.data}</td>
                        <td className="border border-gray-300 px-4 py-2">{registro.doenca}</td>
                        <td className="border border-gray-300 px-4 py-2">{registro.medicamento}</td>
                        <td className="border border-gray-300 px-4 py-2">
                        <div className="flex space-x-4">
                            <button
                            onClick={() => router.push("/view-record")}
                            className="text-blue-500 hover:text-blue-700"
                            >
                            <FaEye />
                            </button>
                            <button
                            onClick={() => router.push("/edit-record")}
                            className="text-yellow-500 hover:text-yellow-700"
                            >
                            <FaPencilAlt />
                            </button>
                            <button
                            onClick={() => handleDelete(registro.id)}
                            className="text-red-500 hover:text-red-700"
                            >
                            <FaTrash />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">Nenhum registro encontrado.</p>
            )}

            {/* Botão Voltar ao Dashboard */}
            <div className="mt-8 text-center">
                <button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 transition"
                >
                Voltar ao Dashboard
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
