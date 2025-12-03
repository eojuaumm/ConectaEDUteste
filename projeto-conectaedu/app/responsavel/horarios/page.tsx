'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  User, 
  LogOut, 
  Search, 
  BookOpen, 
  Calendar, 
  LayoutDashboard,
  FileText,
  Phone,
  Clock,
  MapPin,
  GraduationCap
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

const studentData = {
  name: "João Silva",
  class: "9º Ano A",
  enrollment: "20240123"
};

type Aula = {
  horario: string;
  disciplina: string;
  sala: string;
  professor: string;
};

type DiaSemana = {
  nome: string;
  aulas: Aula[];
};

const horarioSemanal: DiaSemana[] = [
  {
    nome: "SEGUNDA-FEIRA",
    aulas: [
      { horario: "07:30 - 08:20", disciplina: "Matemática", sala: "Sala 101", professor: "Prof. Carlos" },
      { horario: "08:20 - 09:10", disciplina: "Matemática", sala: "Sala 101", professor: "Prof. Carlos" },
      { horario: "09:30 - 10:20", disciplina: "História", sala: "Sala 103", professor: "Prof. Ana" },
      { horario: "10:20 - 11:10", disciplina: "Geografia", sala: "Sala 104", professor: "Prof. Roberto" },
      { horario: "11:10 - 12:00", disciplina: "Inglês", sala: "Lab. Línguas", professor: "Prof. Sarah" },
    ]
  },
  {
    nome: "TERÇA-FEIRA",
    aulas: [
      { horario: "07:30 - 09:10", disciplina: "Ciências", sala: "Lab. Ciências", professor: "Prof. Cláudia" },
      { horario: "09:30 - 11:10", disciplina: "Português", sala: "Sala 101", professor: "Prof. Marcos" },
      { horario: "11:10 - 12:00", disciplina: "Ed. Física", sala: "Quadra", professor: "Prof. Pedro" },
    ]
  },
  {
    nome: "QUARTA-FEIRA",
    aulas: [
      { horario: "07:30 - 08:20", disciplina: "Artes", sala: "Sala de Artes", professor: "Prof. Júlia" },
      { horario: "08:20 - 10:20", disciplina: "Matemática", sala: "Sala 101", professor: "Prof. Carlos" },
      { horario: "10:20 - 12:00", disciplina: "História", sala: "Sala 103", professor: "Prof. Ana" },
    ]
  },
  {
    nome: "QUINTA-FEIRA",
    aulas: [
      { horario: "07:30 - 09:10", disciplina: "Geografia", sala: "Sala 104", professor: "Prof. Roberto" },
      { horario: "09:30 - 11:10", disciplina: "Inglês", sala: "Sala 101", professor: "Prof. Sarah" },
      { horario: "11:10 - 12:00", disciplina: "Redação", sala: "Sala 101", professor: "Prof. Marcos" },
    ]
  },
  {
    nome: "SEXTA-FEIRA",
    aulas: [
      { horario: "07:30 - 09:10", disciplina: "Português", sala: "Sala 101", professor: "Prof. Marcos" },
      { horario: "09:30 - 11:10", disciplina: "Ciências", sala: "Sala 102", professor: "Prof. Cláudia" },
      { horario: "11:10 - 12:00", disciplina: "Projeto de Vida", sala: "Auditório", professor: "Coord. Lúcia" },
    ]
  },
];

export default function HorariosResponsavelPage() {
  const [menuAberto, setMenuAberto] = useState(false);

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
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
               <Image
                  src="/images/logoconectaedureso.png"
                  alt="Logo ConectaEDU"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-xl font-bold text-blue-700 hidden sm:block">ConectaEDU</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{studentData.name}</p>
              <p className="text-xs text-gray-500">Aluno - {studentData.class}</p>
            </div>
            <button className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:ring-2 hover:ring-blue-600 transition-all">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          menuAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMenuAberto(false)}
      />

      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
                placeholder="Pesquisar..."
              />
            </div>
            <button 
              onClick={() => setMenuAberto(false)}
              className="p-2 text-gray-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" className="transform rotate-180"/> 
              </svg>
            </button>
          </div>

          <hr className="border-gray-200 mb-6" />

          <nav className="space-y-4 flex-1">
            <Link href="/" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
              <LayoutDashboard className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Início</span>
            </Link>

            <Link href="/responsavel/atividades" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Atividades</span>
            </Link>

            <Link href="/responsavel/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Mural de Avisos</span>
            </Link>

            {/* Item Ativo */}
            <Link href="/responsavel/horarios" className="flex items-center gap-4 px-2 py-2 text-blue-700 bg-blue-50 rounded-md transition-colors group">
              <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Horários</span>
            </Link>

            <Link href="/responsavel/boletim" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Boletim</span>
            </Link>
          </nav>

          <div className="mt-auto space-y-4">
            <Link href="/" className="flex items-center gap-4 px-2 py-2 text-gray-800 hover:text-red-600 transition-colors font-bold uppercase tracking-wide">
              <LogOut className="w-6 h-6 transform rotate-180" />
              SAIR
            </Link>
            <hr className="border-gray-300" />
            <div className="flex items-center gap-3 px-2 py-2 text-gray-700">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">Contato - (99) 99999-9999</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8 text-center sm:text-left">
           <h1 className="text-3xl font-bold text-blue-700 flex items-center justify-center sm:justify-start gap-2">
             <Clock className="w-8 h-8" /> Quadro de Horários
           </h1>
           <p className="text-gray-500 mt-2">Confira a grade semanal de aulas do aluno <span className="font-semibold text-blue-600">{studentData.name}</span>.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {horarioSemanal.map((dia) => (
            <section 
              key={dia.nome} 
              className="flex flex-col w-full md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)] hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="bg-blue-600 rounded-t-2xl px-6 py-3 text-center shadow-md">
                 <h3 className="text-sm font-bold text-white tracking-wider uppercase">{dia.nome}</h3>
              </div>

              <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden border-x border-b border-gray-100 flex-1">
                <div className="px-4 py-2 bg-blue-50/50 border-b border-blue-100 flex justify-between items-center text-xs font-semibold text-blue-400 uppercase tracking-wide">
                   <span>Horário</span>
                   <span>Disciplina</span>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {dia.aulas.map((aula, i) => (
                    <div key={i} className="flex items-start justify-between px-5 py-4 hover:bg-blue-50/30 transition-colors group">
                      
                      <div className="flex flex-col justify-center min-w-[85px]">
                        <span className="text-sm font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md text-center shadow-sm">
                            {aula.horario.split(' - ')[0]}
                        </span>
                        <span className="text-[10px] text-gray-400 text-center mt-1 font-medium uppercase">
                            até {aula.horario.split(' - ')[1]}
                        </span>
                      </div>

                      <div className="flex-1 pl-4 text-right flex flex-col justify-center">
                        <div className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                            {aula.disciplina}
                        </div>
                        
                        <div className="flex flex-col items-end gap-1 mt-1">
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                <MapPin className="w-3 h-3" />
                                {aula.sala}
                            </div>
                            
                            <div className="inline-flex items-center gap-1 text-xs text-gray-500">
                                <GraduationCap className="w-3 h-3 text-blue-400" />
                                {aula.professor}
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {dia.aulas.length === 0 && (
                      <div className="p-6 text-center text-gray-400 text-sm italic flex flex-col items-center gap-2">
                          <Clock className="w-8 h-8 text-gray-200" />
                          Sem aulas registradas.
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