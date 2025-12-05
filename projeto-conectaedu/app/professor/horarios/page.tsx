'use client';

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

type Aula = {
  horario: string;
  turma: string;
  sala: string;
  disciplina: string;
};

type DiaSemana = {
  nome: string;
  aulas: Aula[];
};

export default function HorarioProfessor() {
  const [menuAberto, setMenuAberto] = useState(false);

  const horarioSemanal: DiaSemana[] = [
    {
      nome: "SEGUNDA-FEIRA",
      aulas: [
        { horario: "07:30 - 08:20", turma: "6º Ano A", sala: "Sala 101", disciplina: "Matemática" },
        { horario: "08:20 - 09:10", turma: "6º Ano A", sala: "Sala 101", disciplina: "Matemática" },
        { horario: "09:30 - 10:20", turma: "7º Ano B", sala: "Sala 103", disciplina: "Geometria" },
        { horario: "10:20 - 11:10", turma: "9º Ano C", sala: "Laboratório 2", disciplina: "Robótica" },
      ]
    },
    {
      nome: "TERÇA-FEIRA",
      aulas: [
        { horario: "07:30 - 08:20", turma: "8º Ano A", sala: "Sala 105", disciplina: "Física" },
        { horario: "08:20 - 09:10", turma: "8º Ano B", sala: "Sala 106", disciplina: "Física" },
        { horario: "10:20 - 11:10", turma: "6º Ano A", sala: "Sala 101", disciplina: "Matemática" },
      ]
    },
    {
      nome: "QUARTA-FEIRA",
      aulas: [
        { horario: "07:30 - 09:10", turma: "3º Médio A", sala: "Auditório", disciplina: "Aulão ENEM" },
        { horario: "09:30 - 10:20", turma: "7º Ano B", sala: "Sala 103", disciplina: "Geometria" },
        { horario: "11:10 - 12:00", turma: "Coordenação", sala: "Sala Prof.", disciplina: "Reunião" },
      ]
    },
    {
      nome: "QUINTA-FEIRA",
      aulas: [
        { horario: "08:20 - 09:10", turma: "9º Ano C", sala: "Sala 108", disciplina: "Robótica Teórica" },
        { horario: "09:30 - 10:20", turma: "8º Ano A", sala: "Laboratório 1", disciplina: "Física Exp." },
      ]
    },
    {
      nome: "SEXTA-FEIRA",
      aulas: [
        { horario: "07:30 - 08:20", turma: "6º Ano B", sala: "Sala 102", disciplina: "Matemática" },
        { horario: "08:20 - 09:10", turma: "6º Ano B", sala: "Sala 102", disciplina: "Matemática" },
        { horario: "10:20 - 11:10", turma: "Plantão", sala: "Biblioteca", disciplina: "Dúvidas" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative font-sans text-gray-900">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
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
            <Link href="/professor/atividades" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="font-medium">Atividades</span>
            </Link>

            <Link href="/professor/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="font-medium">Mural de avisos</span>
            </Link>

            <Link href="/professor/horarios" className="flex items-center gap-4 px-2 py-2 text-[#5B3A9A] bg-purple-50 rounded-md transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Horários</span>
            </Link>

            <Link href="/professor/dashboard" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Turmas</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8 text-center sm:text-left">
           <h1 className="text-3xl font-extrabold text-[#5B3A9A] drop-shadow-sm">
             MEUS HORÁRIOS
           </h1>
           <p className="text-gray-500 mt-2">Consulte sua grade de aulas, turmas e locais de ensino.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {horarioSemanal.map((dia) => (
            <section 
              key={dia.nome} 
              className="flex flex-col w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]"
            >
              <div className="bg-[#5B3A9A] rounded-t-2xl px-6 py-3 text-center shadow-sm flex items-center justify-center gap-2">
                 <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <h3 className="text-sm font-bold text-white tracking-wider">{dia.nome}</h3>
              </div>

              <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden border border-gray-100 flex-1">
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-xs font-semibold text-gray-400 uppercase">
                   <span>Horário</span>
                   <span>Detalhes da Aula</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {dia.aulas.map((aula, i) => (
                    <div key={i} className="flex items-start justify-between px-5 py-4 hover:bg-purple-50 transition-colors group">
                      
                      <div className="flex flex-col justify-center min-w-[80px]">
                        <span className="text-sm font-bold text-[#5B3A9A] bg-purple-100 px-2 py-1 rounded-md text-center">
                            {aula.horario.split(' - ')[0]}
                        </span>
                        <span className="text-xs text-gray-400 text-center mt-1">
                            até {aula.horario.split(' - ')[1]}
                        </span>
                      </div>

                      <div className="flex-1 pl-4 text-right">
                        <div className="text-sm font-bold text-gray-800 mb-1">{aula.disciplina}</div>
                        
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2 mt-1">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {aula.turma}
                            </div>
                            
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {aula.sala}
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {dia.aulas.length === 0 && (
                      <div className="p-6 text-center text-gray-400 text-sm italic">
                          Sem aulas neste dia.
                      </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}