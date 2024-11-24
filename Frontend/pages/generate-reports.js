import { useState } from "react";
import { useRouter } from "next/router";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

export default function GenerateReports() {
    const router = useRouter();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Período selecionado:", { startDate, endDate });
        alert("Configurações enviadas. O PDF será gerado pelo back-end.");
        // Aqui será integrado com o back-end para geração do relatório.
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
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
                <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
            </div>
            </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-grow py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Gerar Relatórios</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Período */}
                <div>
                <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Data de Início</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>
                <div>
                <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">Data de Fim</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                </div>
                <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                >
                    Voltar ao Dashboard
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
                >
                    Gerar Relatório
                </button>
                </div>
            </form>
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
