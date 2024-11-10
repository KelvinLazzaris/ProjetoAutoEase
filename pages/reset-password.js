import { useState } from 'react';

const users = [
  { email: "usuario@exemplo.com", password: "senha123" },
  { email: "outro@exemplo.com", password: "senha456" },
];

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = (e) => {
    e.preventDefault();

    // Verifica se o e-mail existe
    const userExists = users.some((user) => user.email === email);

    if (!userExists) {
      setError("E-mail não encontrado.");
      setMessage('');
    } else {
      // Simula o envio de e-mail de recuperação de senha
      setError('');
      setMessage("Um link de recuperação foi enviado para o seu e-mail.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Resetar Senha</h2>
        <form className="space-y-6" onSubmit={handleReset}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-green-500 text-center">{message}</p>}
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-lg transition duration-200">
            Enviar Link de Recuperação
          </button>
        </form>
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
