import { useRouter } from "next/router";

export default function Unauthorized() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página (Você está deslogado ou seu tempo de sessão expirou). Por favor, faça login para continuar.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
        >
          Ir para Login
        </button>
      </div>
    </div>
  );
}
