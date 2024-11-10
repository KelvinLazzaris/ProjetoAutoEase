import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Painel do Usuário</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Resumo Diário</h2>
        <p className="text-gray-700">Aqui está o resumo dos seus registros de hoje.</p>
        <button onClick={() => router.push('/register-symptoms')} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
          Novo Registro
        </button>
      </div>
    </div>
  );
}
