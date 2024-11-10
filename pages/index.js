import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-50 overflow-hidden">
      {/* Imagem de fundo */}
      <img src="/images/background-wellness.jpg" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="Saúde e bem-estar" />
      
      {/* Logotipo */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-10 h-10" />
        <span className="text-xl font-semibold text-gray-700">AutoEase</span>
      </div>

      {/* Conteúdo principal */}
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Bem-vindo ao AutoEase</h1>
        <p className="text-lg text-gray-700 max-w-md mx-auto mb-8">
          Acompanhe e registre seus sintomas para melhorar seu acompanhamento de saúde.
        </p>
        <div className="flex space-x-4">
          <Link href="/login">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              Cadastro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
