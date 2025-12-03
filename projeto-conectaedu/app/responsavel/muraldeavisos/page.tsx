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
  LayoutDashboard,
  FileText,
  Phone,
  Bell,
  Megaphone,
  AlertCircle,
  Info,
  Clock,
  Filter
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

interface Aviso {
  id: number;
  titulo: string;
  data: string;
  conteudo: string;
  tipo: 'Urgente' | 'Evento' | 'Informativo';
  autor: string;
  lido: boolean;
}

const studentData = {
  name: "João Silva",
  class: "9º Ano A",
  year: "2024",
  enrollment: "20240123"
};

const avisosIniciais: Aviso[] = [
  {
    id: 1,
    titulo: "Renovação de Matrícula",
    data: "12/12/2023",
    conteudo: "O período de renovação de matrícula para o ano letivo de 2024 começa na próxima segunda-feira. Compareça à secretaria.",
    tipo: "Urgente",
    autor: "Secretaria",
    lido: false
  },
  {
    id: 2,
    titulo: "Feira de Ciências",
    data: "15/12/2023",
    conteudo: "Convidamos os pais para prestigiar os projetos dos alunos no ginásio da escola.",
    tipo: "Evento",
    autor: "Coordenação",
    lido: true
  },
  {
    id: 3,
    titulo: "Horário de Provas Finais",
    data: "10/12/2023",
    conteudo: "O calendário das provas de recuperação final já está disponível no portal do aluno.",
    tipo: "Informativo",
    autor: "Diretoria",
    lido: true
  },
  {
    id: 4,
    titulo: "Reunião de Pais",
    data: "20/12/2023",
    conteudo: "Reunião de encerramento do semestre letivo e entrega de boletins impressos.",
    tipo: "Evento",
    autor: "Coordenação Pedagógica",
    lido: false
  }
];

export default function MuralAvisosPage() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | 'Urgente' | 'Evento' | 'Informativo'>('Todos');

  const avisosFiltrados = avisosIniciais.filter(aviso => 
    filtroTipo === 'Todos' ? true : aviso.tipo === filtroTipo
  );

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'Urgente': return "bg-red-50 text-red-700 border-red-200";
      case 'Evento': return "bg-blue-50 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getIcon = (tipo: string) => {
     switch (tipo) {
      case 'Urgente': return <AlertCircle className="w-4 h-4" />;
      case 'Evento': return <Calendar className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
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

            <Link href="/responsavel/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-blue-700 bg-blue-50 rounded-md transition-colors group">
              <Megaphone className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Mural de Avisos</span>
            </Link>

            <Link href="/responsavel/horarios" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-blue-700 transition-colors group">
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
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                Mural de Avisos
            </h1>
            <p className="text-gray-500 mt-1">Fique por dentro das novidades e comunicados.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex gap-1">
                {(['Todos', 'Urgente', 'Evento', 'Informativo'] as const).map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => setFiltroTipo(tipo)}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            filtroTipo === tipo 
                            ? "bg-blue-100 text-blue-700 shadow-sm" 
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        {tipo}
                    </button>
                ))}
             </div>
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
                    <Bell className="w-4 h-4 text-blue-500" /> Avisos Recentes
                 </span>
                 <h3 className="text-2xl font-bold text-gray-800 mt-2">
                    {avisosIniciais.filter(a => !a.lido).length} Novos
                 </h3>
             </div>

             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
                 <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#40C0B4]" /> Próximos Eventos
                 </span>
                 <h3 className="text-2xl font-bold text-gray-800 mt-2">
                    {avisosIniciais.filter(a => a.tipo === 'Evento').length} Confirmados
                 </h3>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {avisosFiltrados.map((aviso, index) => (
                <motion.div 
                    key={aviso.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={cn(
                                    "px-2.5 py-0.5 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 border",
                                    getBadgeColor(aviso.tipo)
                                )}>
                                    {getIcon(aviso.tipo)}
                                    {aviso.tipo}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {aviso.data}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                {aviso.titulo}
                            </h3>
                        </div>
                    </div>

                    <div className="p-6 flex-1">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {aviso.conteudo}
                        </p>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">
                            Por: <span className="text-blue-700">{aviso.autor}</span>
                        </span>
                        
                        {!aviso.lido && (
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                        )}
                    </div>
                </motion.div>
            ))}
            
            {avisosFiltrados.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                    <div className="flex justify-center mb-3">
                        <Filter className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Nenhum aviso encontrado com este filtro.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}