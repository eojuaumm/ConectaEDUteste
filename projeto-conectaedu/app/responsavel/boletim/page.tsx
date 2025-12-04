'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Menu, 
  User, 
  LogOut, 
  Search, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  LayoutDashboard,
  FileText,
  Download,
  Clock,
  Phone
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

interface Grade {
  subject: string;
  b1: number | null;
  b2: number | null;
  b3: number | null;
  b4: number | null;
  absences: number;
  status: 'Aprovado' | 'Recuperação' | 'Cursando';
}

const studentData = {
  name: "João Silva",
  class: "9º Ano A",
  year: "2024",
  enrollment: "20240123"
};

const initialGrades: Grade[] = [
  { subject: "Matemática", b1: 8.5, b2: 7.0, b3: null, b4: null, absences: 2, status: "Cursando" },
  { subject: "Português", b1: 9.0, b2: 8.5, b3: null, b4: null, absences: 0, status: "Cursando" },
  { subject: "História", b1: 6.5, b2: 7.5, b3: null, b4: null, absences: 1, status: "Cursando" },
  { subject: "Geografia", b1: 8.0, b2: 8.0, b3: null, b4: null, absences: 0, status: "Cursando" },
  { subject: "Ciências", b1: 7.0, b2: 6.0, b3: null, b4: null, absences: 4, status: "Cursando" },
  { subject: "Inglês", b1: 9.5, b2: 9.0, b3: null, b4: null, absences: 0, status: "Cursando" },
  { subject: "Educação Física", b1: 10.0, b2: 10.0, b3: null, b4: null, absences: 0, status: "Cursando" },
];

export default function BoletimPage() {
  const [menuAberto, setMenuAberto] = useState(false);

  const calculateAverage = (g: Grade) => {
    const grades = [g.b1, g.b2, g.b3, g.b4].filter(n => n !== null) as number[];
    if (grades.length === 0) return "-";
    const sum = grades.reduce((a, b) => a + b, 0);
    return (sum / grades.length).toFixed(1);
  };

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

            <Link href="/responsavel/horarios" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
              <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Horários</span>
            </Link>

            <Link href="/responsavel/boletim" className="flex items-center gap-4 px-2 py-2 text-blue-700 bg-blue-50 rounded-md transition-colors group">
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
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700">Bolet im Escolar</h1>
            <p className="text-gray-500 mt-1">Acompanhe seu desempenho acadêmico.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                Ano Letivo: <strong>{studentData.year}</strong>
             </span>
             <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                <Download className="w-4 h-4" />
                Baixar PDF
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-blue-100 text-sm font-medium">Aluno</span>
                </div>
                <h3 className="text-xl font-bold">{studentData.name}</h3>
                <p className="text-blue-100 text-sm mt-1">Matrícula: {studentData.enrollment}</p>
             </div>

             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                 <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" /> Turma
                 </span>
                 <h3 className="text-2xl font-bold text-gray-800 mt-2">{studentData.class}</h3>
             </div>

             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                 <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#40C0B4]" /> Total de Matérias
                 </span>
                 <h3 className="text-2xl font-bold text-gray-800 mt-2">{initialGrades.length} Disciplinas</h3>
             </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-50/50 border-b border-blue-100">
                            <th className="py-4 px-6 text-sm font-semibold text-blue-800 w-1/3">Disciplina</th>
                            <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">1º Bim</th>
                            <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">2º Bim</th>
                            <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">3º Bim</th>
                            <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">4º Bim</th>
                            <th className="py-4 px-4 text-sm font-semibold text-blue-700 text-center">Média</th>
                            <th className="py-4 px-4 text-sm font-semibold text-gray-600 text-center">Faltas</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-right">Situação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialGrades.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                                <td className="py-4 px-6 font-medium text-gray-800">{item.subject}</td>
                                <td className="py-4 px-4 text-center text-gray-600">{item.b1?.toFixed(1) ?? '-'}</td>
                                <td className="py-4 px-4 text-center text-gray-600">{item.b2?.toFixed(1) ?? '-'}</td>
                                <td className="py-4 px-4 text-center text-gray-400">{item.b3?.toFixed(1) ?? '-'}</td>
                                <td className="py-4 px-4 text-center text-gray-400">{item.b4?.toFixed(1) ?? '-'}</td>
                                <td className="py-4 px-4 text-center font-bold text-blue-600 bg-blue-50/30 rounded-lg">
                                    {calculateAverage(item)}
                                </td>
                                <td className="py-4 px-4 text-center text-gray-600">{item.absences}</td>
                                <td className="py-4 px-6 text-right">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium border",
                                        item.status === 'Aprovado' ? "bg-green-50 text-green-700 border-green-200" :
                                        item.status === 'Recuperação' ? "bg-red-50 text-red-700 border-red-200" :
                                        "bg-blue-50 text-blue-700 border-blue-200"
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>

        <div className="md:hidden space-y-4">
            {initialGrades.map((item, index) => (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                 >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-gray-800 text-lg">{item.subject}</h3>
                        <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            "bg-blue-50 text-blue-700"
                        )}>
                            {item.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 mb-1">1º Bim</span>
                            <span className="font-bold text-gray-800">{item.b1 ?? '-'}</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-xs text-gray-500 mb-1">2º Bim</span>
                            <span className="font-bold text-gray-800">{item.b2 ?? '-'}</span>
                        </div>
                         <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg border border-transparent">
                            <span className="text-xs text-gray-400 mb-1">3º Bim</span>
                            <span className="font-medium text-gray-400">{item.b3 ?? '-'}</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg border border-transparent">
                            <span className="text-xs text-gray-400 mb-1">4º Bim</span>
                            <span className="font-medium text-gray-400">{item.b4 ?? '-'}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                            Faltas: <span className="text-gray-800 font-medium">{item.absences}</span>
                        </div>
                        <div className="text-sm text-blue-700 font-medium flex items-center gap-2">
                            Média Parcial: <span className="text-lg font-bold">{calculateAverage(item)}</span>
                        </div>
                    </div>
                 </motion.div>
            ))}
        </div>

      </main>
    </div>
  );
}
