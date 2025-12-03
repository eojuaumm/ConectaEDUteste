import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU - Sobre Nós',
  description: 'Conheça a missão e os criadores por trás do ConectaEDU',
};

const criadores = [
  {
    nome: 'Clara',
    funcao: '{função}',
    descricao: '',
    imagem: '/images/logoconectaedureso.png' 
  },
  {
    nome: 'Linaldo',
    funcao: 'Programador Front-End',
    descricao: '',
    imagem: '/images/logoconectaedureso.png'
  },
  {
    nome: 'Cauan',
    funcao: '{função}',
    descricao: '',
    imagem: '/images/logoconectaedureso.png'
  },
  {
    nome: 'João Victor',
    funcao: 'Desenvolvedor FullStack',
    descricao: '',
    imagem: '/images/logoconectaedureso.png'
  },
  {
    nome: 'Isabele',
    funcao: 'UI/UX Designer',
    descricao: '',
    imagem: '/images/logoconectaedureso.png'
  },
  {
    nome: 'Gustavo',
    funcao: 'Programador Front-End',
    descricao: '',
    imagem: '/images/logoconectaedureso.png'
  },
];

export default function TelaSobre() {
  return (
    <main className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-[#5B3A9A] transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar ao Início</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#5B3A9A]">ConectaEDU</span>
          </div>
        </div>
      </header>

      <section className="bg-[#5B3A9A] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
             <Image
                src="/images/logoconectaedureso.png"
                alt="Logo ConectaEDU"
                width={120}
                height={120}
                className="rounded-full bg-white p-1 shadow-lg"
              />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Conectando o Futuro da Educação
          </h1>
          <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-2xl mx-auto">
            O ConectaEDU nasceu com o propósito de simplificar a rotina escolar, 
            aproximando professores, alunos e responsáveis através de uma plataforma 
            intuitiva e eficiente.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 -mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { titulo: 'Missão', texto: 'Facilitar a gestão educacional com tecnologia acessível.', icon: '🚀' },
                { titulo: 'Visão', texto: 'Ser referência em inovação para escolas em todo o país.', icon: '👁️' },
                { titulo: 'Valores', texto: 'Transparência, Colaboração e Inovação contínua.', icon: '💎' }
            ].map((item) => (
                <div key={item.titulo} className="bg-white rounded-xl shadow-lg p-8 text-center border-b-4 border-[#40C0B4] transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.titulo}</h3>
                    <p className="text-gray-600">{item.texto}</p>
                </div>
            ))}
        </div>
      </section>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-[#40C0B4] tracking-widest uppercase mb-2">Quem faz acontecer</h2>
          <h3 className="text-3xl font-bold text-[#5B3A9A]">Conheça a Equipe</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {criadores.map((criador, index) => (
            <div 
                key={index} 
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
            >
              <div className="h-24 bg-gradient-to-r from-[#5B3A9A] to-[#40C0B4] relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white overflow-hidden flex items-center justify-center">
                        <Image
                            src={criador.imagem}
                            alt={criador.nome}
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                </div>
              </div>
              
              <div className="pt-16 pb-8 px-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#5B3A9A] transition-colors">
                    {criador.nome}
                </h4>
                <span className="inline-block px-3 py-1 mt-2 text-xs font-medium text-[#5B3A9A] bg-purple-50 rounded-full border border-purple-100">
                    {criador.funcao}
                </span>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed h-20 overflow-hidden">
                    {criador.descricao}
                </p>

                <div className="flex justify-center gap-4 mt-6 opacity-60">
                    <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-[#5B3A9A] hover:text-white transition-colors flex items-center justify-center cursor-pointer">in</div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full hover:bg-[#5B3A9A] hover:text-white transition-colors flex items-center justify-center cursor-pointer">GitHub</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-gray-100 py-8 text-center border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ConectaEDU. Todos os direitos reservados.
        </p>
      </footer>

    </main>
  );
}
