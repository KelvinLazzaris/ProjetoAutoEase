import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8181/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(
          'authToken',
          JSON.stringify({
            token: data.token,
            expiryDate: new Date().getTime() + 3 * 24 * 60 * 60 * 1000, // Expira em 3 dias
          })
        );
        alert('Login realizado com sucesso!');
        router.push('/dashboard'); // Redireciona para o dashboard
      } else {
        const errorData = await response.json();
        // Exibir mensagens específicas de erro
        if (errorData.error === 'Service error: authentication failed because user does not exist. Event occurred in method: .(*authService).Login.') {
          setError('O e-mail informado não está cadastrado.');
        } else if (errorData.error === 'Service error: authentication failed because password is incorrect. Event occurred in method: .(*authService).Login.') {
          setError('A senha está incorreta.');
        } else {
          setError(errorData.error || 'Erro desconhecido.');
        }
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
      console.error(err);
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
            onClick={() => router.push('/')} // Navega para a tela inicial
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

      {/* Formulário de Login */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo de E-mail */}
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500">
                  <FaEnvelope />
                </span>
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

            {/* Campo de Senha */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Senha</label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <span className="px-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
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

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-center">
            <a href="/register" className="text-sm text-green-600 hover:underline">
              Não tem uma conta? Cadastre-se
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
