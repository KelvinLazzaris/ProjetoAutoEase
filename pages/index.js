import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabeçalho Responsivo */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-6 h-6 sm:w-8 sm:h-8" />
          <h1 className="text-xl sm:text-2xl font-bold text-green-600">AutoEase</h1>
        </div>
        <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
          <Link href="#about" className="hover:text-green-600">Sobre</Link>
          <Link href="#services" className="hover:text-green-600">Serviços</Link>
          <Link href="#testimonials" className="hover:text-green-600">Depoimentos</Link>
          <Link href="/login" className="hover:text-green-600">Login</Link>
        </nav>
      </header>

      {/* Imagem de Destaque com Texto */}
      <section className="relative">
        <img src="/images/background-wellness.jpg" alt="Imagem de Destaque" className="w-full h-60 sm:h-80 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">Bem-vindo ao AutoEase</h2>
          <p className="max-w-md text-sm sm:text-lg mb-4">
            Gerencie seus sintomas e identifique fatores que influenciam sua saúde de forma prática e acessível.
          </p>
          <Link href="/register">
            <button className="bg-white text-green-600 px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100">
              Começar Agora
            </button>
          </Link>
        </div>
      </section>

      {/* Seção Sobre com Transição de Cor */}
      <motion.section 
        id="about" 
        className="py-12 bg-gradient-to-b from-gray-100 to-white text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Sobre o AutoEase</h3>
        <p className="max-w-2xl mx-auto text-gray-700 text-sm sm:text-base">
          O AutoEase foi criado para ajudar pessoas com condições autoimunes a monitorar seus sintomas e identificar fatores externos que possam influenciar sua saúde. Nossa plataforma oferece ferramentas fáceis de usar para registrar sintomas, analisar padrões e compartilhar relatórios personalizados com seus médicos.
        </p>
      </motion.section>

      {/* Espaçamento entre as Seções */}
      <div className="my-8 sm:my-12"></div>

      {/* Destaques dos Serviços com Cartões */}
      <motion.section 
        id="services" 
        className="py-12 bg-white text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Nossos Serviços</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-green-600 mb-2">Monitoramento de Sintomas</h4>
            <p className="text-gray-600 text-sm sm:text-base">Acompanhe seus sintomas diariamente para identificar padrões e melhorar seu bem-estar.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-green-600 mb-2">Análise de Fatores Externos</h4>
            <p className="text-gray-600 text-sm sm:text-base">Avalie o impacto de fatores como clima, estresse e alimentação na sua saúde.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-green-600 mb-2">Relatórios Personalizados</h4>
            <p className="text-gray-600 text-sm sm:text-base">Gere relatórios completos para compartilhar com seu médico e obter insights.</p>
          </div>
        </div>
      </motion.section>

      {/* Depoimentos com Efeito de Movimento */}
      <motion.section 
        id="testimonials" 
        className="py-12 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">O que nossos usuários dizem</h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-gray-600 italic text-sm sm:text-base">“O AutoEase mudou minha forma de acompanhar meus sintomas.”</p>
            <div className="flex justify-center items-center mt-2">
              {[...Array(5)].map((_, i) => <AiFillStar key={i} className="text-yellow-500" />)}
            </div>
            <span className="block mt-2 font-semibold text-gray-800">— João Silva</span>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-gray-600 italic text-sm sm:text-base">“É fácil de usar e ajuda muito na minha rotina de autocuidado.”</p>
            <div className="flex justify-center items-center mt-2">
              {[...Array(4)].map((_, i) => <AiFillStar key={i} className="text-yellow-500" />)}
            </div>
            <span className="block mt-2 font-semibold text-gray-800">— Maria Oliveira</span>
          </div>
        </div>
      </motion.section>

      {/* Rodapé com Ícones de Redes Sociais */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>&copy; 2024 AutoEase. Todos os direitos reservados.</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target='blank' ><FaFacebook size={20} /></a>
            <a href="https://www.instagram.com/" target='blank' ><FaInstagram size={20} /></a>
            <a href="https://x.com/?lang=pt-br" target='blank' ><FaTwitter size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
