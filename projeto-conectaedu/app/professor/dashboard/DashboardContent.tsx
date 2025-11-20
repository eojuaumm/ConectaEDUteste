'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type AnoEscolar = {
  id: string;
  titulo: string;
  nivel: string;
};

const anosEscolares: AnoEscolar[] = [
  { id: '6-fund', titulo: '6º Ano', nivel: 'Ensino Fundamental' },
  { id: '7-fund', titulo: '7º Ano', nivel: 'Ensino Fundamental' },
  { id: '8-fund', titulo: '8º Ano', nivel: 'Ensino Fundamental' },
  { id: '9-fund', titulo: '9º Ano', nivel: 'Ensino Fundamental' },
  { id: '1-medio', titulo: '1º Ano', nivel: 'Ensino Médio' },
  { id: '2-medio', titulo: '2º Ano', nivel: 'Ensino Médio' },
  { id: '3-medio', titulo: '3º Ano', nivel: 'Ensino Médio' },
];

const letrasTurmas = ['A', 'B', 'C', 'D'];

export default function DashboardProfessor() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState<AnoEscolar | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMenuAberto(true)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
                 <Image
                    src="/images/logoconectaedureso.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                <span className="text-xl font-bold text-[#5B3A9A] hidden sm:block">ConectaEDU</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Professor(a)</p>
              <p className="text-xs text-gray-500">Logado</p>
            </div>
            <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-[#5B3A9A] hover:ring-2 hover:ring-[#5B3A9A] transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          menuAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuAberto(false)}
      />

      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#5B3A9A] focus:border-[#5B3A9A] sm:text-sm"
                placeholder="Pesquisar..."
              />
            </div>
            <button 
              onClick={() => setMenuAberto(false)}
              className="p-2 text-gray-600 hover:text-[#5B3A9A] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" className="transform rotate-180"/> 
              </svg>
            </button>
          </div>

          <hr className="border-gray-200 mb-6" />
          <nav className="space-y-4 flex-1">
            
            <Link href="#" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="font-medium">Atividades</span>
            </Link>

            <Link href="#" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="font-medium">Mural de avisos</span>
            </Link>

            <Link href="#" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Horários</span>
            </Link>

            <Link href="/professor/dashboard" className="flex items-center gap-4 px-2 py-2 text-[#5B3A9A] bg-purple-50 rounded-md transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Turmas</span>
            </Link>

            <Link href="#" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span className="font-medium">Boletim</span>
            </Link>
          </nav>

          <div className="mt-auto space-y-4">
            
            <Link href="/" className="flex items-center gap-4 px-2 py-2 text-gray-800 hover:text-red-600 transition-colors font-bold uppercase tracking-wide">
              <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              SAIR
            </Link>

            <hr className="border-gray-300" />

            <div className="flex items-center gap-3 px-2 py-2 text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">Contato - (99) 99999-9999</span>
            </div>
          </div>
        </div>
      </aside>

      {anoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            
            <div className="bg-[#5B3A9A] p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Selecione a Turma
              </h2>
              <button 
                onClick={() => setAnoSelecionado(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 text-center text-lg">
                Qual turma do <span className="font-bold text-[#5B3A9A]">{anoSelecionado.titulo}</span> você deseja acessar?
              </p>

              <div className="grid grid-cols-2 gap-4">
                {letrasTurmas.map((letra) => (
                  <Link 
                    key={letra}
                    href={`/professor/turma/${anoSelecionado.id}-${letra}`} 
                    className="group"
                  >
                    <div className="bg-[#40C0B4] hover:bg-[#36a096] text-white rounded-xl py-4 px-6 flex flex-col items-center justify-center shadow-md transition-all transform group-hover:-translate-y-1">
                      <span className="text-xs opacity-80 font-medium uppercase">Turma</span>
                      <span className="text-3xl font-bold">{letra}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex justify-end">
              <button 
                onClick={() => setAnoSelecionado(null)}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#5B3A9A] rounded-2xl shadow-xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
               <path d="M0 50 Q 50 100 100 50 V 100 H 0 Z" fill="white" />
             </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide uppercase">
              Selecione o Ano Escolar
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {anosEscolares.map((ano) => (
                <div 
                  key={ano.id} 
                  onClick={() => setAnoSelecionado(ano)}
                  className="group cursor-pointer"
                >
                  <div className="bg-[#40C0B4] rounded-xl p-6 h-40 flex flex-col items-center justify-center shadow-md transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    
                    <h2 className="text-3xl font-bold text-white text-center group-hover:scale-105 transition-transform">
                      {ano.titulo}
                    </h2>
                    
                    <p className="text-white/90 mt-2 text-sm font-medium uppercase tracking-wide">
                      {ano.nivel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}