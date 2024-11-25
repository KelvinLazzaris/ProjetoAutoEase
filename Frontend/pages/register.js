import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [disease, setDisease] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const fetchDiseases = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8180/api/diseases");
        if (response.ok) {
            const data = await response.json();
            setDiseases(data);
        }
    } catch (error) {
        console.error("Erro ao carregar doenças:", error);
    } 
    };

    useEffect(() => {
      fetchDiseases();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    const payload = {
        email,
        password,
        username: name,
        disease: parseInt(disease, 10),
    };

    try {
        const response = await fetch("http://127.0.0.1:8181/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.error === "500 (Internal Server Error)") {
                alert("Erro: Este e-mail já está cadastrado.");
            } else {
                alert(`Erro: ${responseData.message || "Não foi possível realizar o cadastro."}`);
            }
        } else {
            // Exibe mensagem bonita de sucesso
            alert("🎉 Cadastro realizado com sucesso! Bem-vindo ao AutoEase.");
            router.push("/login");
        }
    } catch (error) {
        alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Cabeçalho Responsivo */}
      <header className="bg-gray-800 text-white shadow-md py-4 px-6">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-green-400 transition">Ínicio</Link>
          </nav>
          <button onClick={toggleMenu} className="md:hidden text-gray-200 hover:text-green-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-700 text-white text-center py-4 space-y-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Inicio</Link>
          </div>
        )}
      </header>

      {/* Formulário de Cadastro */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Campo Nome */}
            <div className="relative">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nome</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500"><FaUser /></span>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Campo Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500"><FaEnvelope /></span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Senha</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500"><FaLock /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="px-3 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Campo Confirmar Senha */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirme sua Senha</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500"><FaLock /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Digite sua senha novamente"
                  className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Campo Doença */}
            <div>
              <label htmlFor="disease" className="block font-semibold text-gray-700">Doença</label>
              <select
                id="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Selecione...</option>
                {diseases.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option> // d.id deve ser um número
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition"
            >
              Cadastrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-green-600 hover:underline">
              Já tem uma conta? Faça o login
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé */}
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
