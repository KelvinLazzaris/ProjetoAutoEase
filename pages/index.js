import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.jpg',
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabeçalho Responsivo */}
      <header className="bg-gray-800 text-white shadow-md py-4 px-6">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/logo-health.png" alt="Logo AutoEase" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-green-400">AutoEase</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#about" className="hover:text-green-400 transition">Sobre</Link>
            <Link href="#services" className="hover:text-green-400 transition">Serviços</Link>
            <Link href="#testimonials" className="hover:text-green-400 transition">Depoimentos</Link>
            <Link href="#contact" className="hover:text-green-400 transition">Contato</Link>
            <Link href="#gallery" className="hover:text-green-400 transition">Galeria</Link>
            <Link href="/login" className="hover:text-green-400 transition">Login</Link>
          </nav>
          <button onClick={toggleMenu} className="md:hidden text-gray-200 hover:text-green-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-700 text-white text-center py-4 space-y-4">
            <Link href="#about" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Sobre</Link>
            <Link href="#services" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Serviços</Link>
            <Link href="#testimonials" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Depoimentos</Link>
            <Link href="#contact" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Contato</Link>
            <Link href="#gallery" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Galeria</Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block hover:text-green-400">Login</Link>
          </div>
        )}
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
        className="py-12 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Sobre o AutoEase</h3>
        <p className="max-w-2xl mx-auto text-gray-800 text-sm sm:text-base">
          O AutoEase foi criado para ajudar pessoas com condições autoimunes a monitorar seus sintomas e identificar fatores externos que possam influenciar sua saúde. Nossa plataforma oferece ferramentas fáceis de usar para registrar sintomas, analisar padrões e compartilhar relatórios personalizados com seus médicos.
        </p>
      </motion.section>

      {/* Destaques dos Serviços com Cartões */}
      <motion.section 
        id="services" 
        className="py-12 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Nossos Serviços</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-green-600 mb-2">Monitoramento de Sintomas</h4>
            <p className="text-gray-600 text-sm sm:text-base">Acompanhe seus sintomas diariamente para identificar padrões e melhorar seu bem-estar.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-green-600 mb-2">Análise de Fatores Externos</h4>
            <p className="text-gray-600 text-sm sm:text-base">Avalie o impacto de fatores como clima, estresse e alimentação na sua saúde.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">O que nossos usuários dizem</h3>
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

      {/* Galeria com Carrossel Controlado por Setas */}
      <motion.section
        id="gallery"
        className="py-12 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Galeria</h3>
        <div className="relative max-w-4xl mx-auto overflow-hidden">
          <motion.img
            key={currentSlide}
            src={images[currentSlide]}
            alt={`Imagem ${currentSlide + 1}`}
            className="w-full h-96 object-cover rounded-md shadow-lg transition-opacity duration-500"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          />
          {/* Setas de Navegação */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>
      </motion.section>

      {/* Seção de Contato */}
      <motion.section
        id="contact"
        className="py-12 bg-gray-100 text-center px-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contato</h3>
        <p className="max-w-2xl mx-auto text-gray-800 mb-8">
          Se você tiver dúvidas ou comentários, entre em contato conosco!
        </p>
        <form className="max-w-md mx-auto space-y-4">
          <input type="text" placeholder="Seu nome" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="email" placeholder="Seu e-mail" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
          <textarea placeholder="Sua mensagem" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-500 transition">Enviar</button>
        </form>
      </motion.section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">AutoEase</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              O AutoEase ajuda você a monitorar seus sintomas e identificar fatores externos que afetam sua saúde, fornecendo uma plataforma prática e acessível para acompanhar seu bem-estar.
            </p>
          </div>
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-semibold mb-4 text-green-400">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-green-400 transition">Sobre</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-green-400 transition">Serviços</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-green-400 transition">Depoimentos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-green-400 transition">Contato</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-green-400 transition">Galeria</a></li>
            </ul>
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
