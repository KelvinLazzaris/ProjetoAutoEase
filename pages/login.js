import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const users = [
  { email: "usuario@exemplo.com", password: "senha123" },
  { email: "outro@exemplo.com", password: "senha456" },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === email);

    if (!user) {
      setError("Usuário não encontrado.");
    } else if (user.password !== password) {
      setError("Senha incorreta.");
    } else {
      setError('');
      router.push('/dashboard');
    }
  };

  const handleResetPassword = () => {
    router.push('/reset-password');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="/images/icon-email.png" className="w-5 h-5 mr-3" alt="Ícone de E-mail" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <img src="/images/icon-password.png" className="w-5 h-5 mr-3" alt="Ícone de Senha" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-200">
            Entrar
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <button onClick={handleResetPassword} className="hover:underline">
            Esqueceu a senha?
          </button>
          <Link href="/register">
            <span className="hover:underline cursor-pointer">Não tem uma conta? Crie agora</span>
          </Link>
        </div>

        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
}