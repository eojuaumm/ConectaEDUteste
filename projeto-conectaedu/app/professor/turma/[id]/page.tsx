'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
  ChevronLeft,
  Users,
  ClipboardCheck,
  GraduationCap,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

export default function DetalhesTurmaPage() {
  const params = useParams();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);
  
  const turmaIdRaw = (Array.isArray(params?.id) ? params.id[0] : params?.id) || '';
  
  const getTurmaInfo = (id: string) => {
    if (!id) return { titulo: 'Carregando...', nivel: '' };

    const partes = id.split('-');
    const letra = partes[partes.length - 1]; 
    const codigoAno = partes.slice(0, -1).join('-'); 

    const mapasAnos: Record<string, { titulo: string; nivel: string }> = {
      '6-fund': { titulo: '6º Ano', nivel: 'Ensino Fundamental II' },
      '7-fund': { titulo: '7º Ano', nivel: 'Ensino Fundamental II' },
      '8-fund': { titulo: '8º Ano', nivel: 'Ensino Fundamental II' },
      '9-fund': { titulo: '9º Ano', nivel: 'Ensino Fundamental II' },
      '1-medio': { titulo: '1º Ano', nivel: 'Ensino Médio' },
      '2-medio': { titulo: '2º Ano', nivel: 'Ensino Médio' },
      '3-medio': { titulo: '3º Ano', nivel: 'Ensino Médio' },
    };

    const infoAno = mapasAnos[codigoAno] || { titulo: 'Turma Desconhecida', nivel: '' };

    return {
      titulo: `${infoAno.titulo} ${letra}`,
      nivel: infoAno.nivel
    };
  };

  const turmaInfo = getTurmaInfo(turmaIdRaw);

  const acoesTurma = [
    { 
      titulo: "Realizar Chamada", 
      desc: "Registrar faltas e presenças hoje.", 
      icon: ClipboardCheck, 
      cor: "bg-blue-500",
      href: "#"
    },
    { 
      titulo: "Lançar Notas", 
      desc: "Gerenciar avaliações e resultados.", 
      icon: GraduationCap, 
      cor: "bg-purple-500",
      href: "#"
    },
    { 
      titulo: "Lista de Alunos", 
      desc: "Ver dados e fichas dos estudantes.", 
      icon: Users, 
      cor: "bg-teal-500",
      href: "#" 
    },
    { 
      titulo: "Ocorrências", 
      desc: "Registrar comportamento e avisos.", 
      icon: AlertCircle, 
      cor: "bg-orange-500",
      href: `/professor/turma/${turmaIdRaw}/ocorrencias`
    },
    { 
      titulo: "Plano de Aula", 
      desc: "Organizar conteúdo programático.", 
      icon: BookOpen, 
      cor: "bg-pink-500",
      href: "#" 
    },
    { 
      titulo: "Relatórios", 
      desc: "Exportar dados gerais da turma.", 
      icon: FileSpreadsheet, 
      cor: "bg-slate-500",
      href: `/professor/turma/${turmaIdRaw}/relatorios`
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
              <Menu className="w-6 h-6" />
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
            <a href="/professor/atividades" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Atividades</span>
            </a>
            <a href="/professor/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Mural de avisos</span>
            </a>
            <a href="/professor/horarios" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Horários</span>
            </a>
            <a href="/professor/dashboard" className="flex items-center gap-4 px-2 py-2 text-[#5B3A9A] bg-purple-50 rounded-md transition-colors group">
              <LayoutDashboard className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Turmas</span>
            </a>
          </nav>
          <div className="mt-auto space-y-4">
            <a href="/" className="flex items-center gap-4 px-2 py-2 text-gray-800 hover:text-red-600 transition-colors font-bold uppercase tracking-wide">
              <LogOut className="w-6 h-6 transform rotate-180" />
              SAIR
            </a>
            <hr className="border-gray-300" />
            <div className="flex items-center gap-3 px-2 py-2 text-gray-700">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium">Contato - (99) 99999-9999</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-6">
            <button 
                onClick={() => router.back()} 
                className="flex items-center text-gray-500 hover:text-[#5B3A9A] transition-colors text-sm font-medium"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para Seleção de Turmas
            </button>
        </div>

        <div className="bg-gradient-to-r from-[#5B3A9A] to-[#7B52C6] rounded-2xl p-8 text-white shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{turmaInfo.titulo}</h1>
                <p className="text-white/80 text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {turmaInfo.nivel}
                </p>
            </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciamento da Turma</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {acoesTurma.map((acao, index) => (
                <Link href={acao.href} key={index} className="group cursor-pointer select-none block">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex items-start gap-4 transition-all hover:shadow-md hover:border-[#5B3A9A]/30">
                        <div className={cn("p-3 rounded-lg text-white shadow-md group-hover:scale-105 transition-transform", acao.cor)}>
                            <acao.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5B3A9A] transition-colors">
                                {acao.titulo}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {acao.desc}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#40C0B4]" />
                    Próxima Aula
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900">Matemática</p>
                    <p className="text-sm text-gray-500">Hoje, 10:20 - 11:10</p>
                    <p className="text-xs text-[#5B3A9A] mt-2 font-medium">Sala 101</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Avisos Pendentes
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                        <span>Entregar notas do 1º Bimestre até sexta-feira.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#40C0B4] mt-2 flex-shrink-0"></div>
                        <span>Reunião de pais agendada para o dia 25.</span>
                    </li>
                </ul>
            </div>
        </div>

      </main>
    </div>
  );
}