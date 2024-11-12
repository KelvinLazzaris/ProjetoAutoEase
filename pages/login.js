import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de autenticação
    if (email === 'user@example.com' && password === 'password') {
      alert('Login bem-sucedido!');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Bem-vindo ao AutoEase</h2>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Digite sua senha"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Entrar
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
            Esqueceu a senha?
          </Link>
          <Link href="/register" className="text-sm text-green-600 hover:underline">
            Não tem uma conta? Crie agora
          </Link>
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/" className="text-green-600 hover:text-green-500 text-sm font-medium">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
