import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validação simples do e-mail e senha
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Simulação de criação de conta
    setMessage("Conta criada com sucesso! Você pode fazer login agora.");
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      {/* Partículas de fundo */}
      <div className="particle particle-small" style={{ top: '20%', left: '30%' }}></div>
      <div className="particle particle-medium" style={{ top: '60%', left: '70%' }}></div>
      <div className="particle particle-large" style={{ top: '40%', left: '20%' }}></div>
      <div className="particle particle-small" style={{ top: '80%', left: '50%' }}></div>

      {/* Conteúdo principal da página */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500 ease-out opacity-0 animate-fadeIn">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 text-center transform transition duration-500 ease-in-out translate-y-2">
              {error}
            </p>
          )}
          {message && (
            <p className="text-green-500 text-center transform transition duration-500 ease-in-out translate-y-2">
              {message}
            </p>
          )}
          
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 input-focus"
            required
          />
          
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 input-focus"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-lg button-hover button-pulse"
          >
            Cadastrar
          </button>
        </form>
        
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link href="/login">
            <span className="hover-link cursor-pointer">Já tem uma conta? Faça login</span>
          </Link>
          <Link href="/">
            <span className="hover-link cursor-pointer">Voltar para a Página Inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
