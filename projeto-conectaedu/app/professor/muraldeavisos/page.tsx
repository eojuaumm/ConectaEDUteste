'use client';

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, User, Search, Plus } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Category = "Geral" | "Eventos" | "Provas" | "Esportes" | "Urgente";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  location?: string;
  category: Category;
  author: string;
}

const categoryStyles: Record<Category, string> = {
  Geral: "bg-gray-100 text-gray-700 border-gray-200",
  Eventos: "bg-blue-50 text-blue-700 border-blue-200",
  Provas: "bg-red-50 text-red-700 border-red-200",
  Esportes: "bg-green-50 text-green-700 border-green-200",
  Urgente: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

const initialNotices: Notice[] = [
  { id: "1", title: "Feira de Ciências 2024", content: "Preparem seus projetos! As inscrições para a feira anual de ciências estão abertas.", date: "2024-05-20", location: "Ginásio", category: "Eventos", author: "Coordenação" },
  { id: "2", title: "Prova de Matemática - 9º Ano", content: "Conteúdo: Álgebra Linear e Funções do Segundo Grau. Estudem com antecedência!", date: "2024-06-15", category: "Provas", author: "Prof. Lúcia" },
  { id: "3", title: "Treino de Vôlei Cancelado", content: "O treino de vôlei desta tarde foi cancelado devido a manutenção na quadra.", date: "2024-05-18", location: "Quadra Poliesportiva", category: "Esportes", author: "Treinador Marcos" },
  { id: "4", title: "Reunião de Pais e Mestres", content: "Agenda: desempenho acadêmico, planejamento do segundo semestre e novos projetos pedagógicos.", date: "2024-06-01", location: "Auditório Principal", category: "Eventos", author: "Diretoria" },
  { id: "5", title: "Alerta: Vazamento de Água no Bloco C", content: "O acesso ao Bloco C está temporariamente interditado.", date: "2024-05-19", category: "Urgente", author: "Zeladoria" },
  { id: "6", title: "Início do Clube de Leitura", content: "Nosso primeiro livro será 'Dom Casmurro'. Inscrevam-se na biblioteca.", date: "2024-06-10", location: "Biblioteca", category: "Geral", author: "Prof. Ana" },
  { id: "11", title: "Vaga de Estágio - Biblioteca", content: "Vaga para alunos do 3º ano. Enviar currículo para a coordenação.", date: "2024-05-22", category: "Geral", author: "RH Escolar" },
];

interface NewNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

function NewNoticeModal({ isOpen, onClose, onSave }: NewNoticeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#5B3A9A]">Novo Aviso</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#5B3A9A] focus:ring-[#5B3A9A] focus:outline-none" placeholder="Ex: Reunião de Pais" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#5B3A9A] focus:ring-[#5B3A9A] focus:outline-none">
                <option>Geral</option>
                <option>Eventos</option>
                <option>Provas</option>
                <option>Esportes</option>
                <option>Urgente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <textarea className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#5B3A9A] focus:ring-[#5B3A9A] focus:outline-none" rows={3} placeholder="Detalhes do aviso..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
              Cancelar
            </button>
            <button onClick={() => { onSave?.(); onClose(); }} className="px-6 py-2 rounded-lg bg-[#5B3A9A] text-white font-medium hover:bg-[#5B3A9A]/90 transition-colors shadow-md">
              Publicar Aviso
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function NoticeBoard() {
  const [menuAberto, setMenuAberto] = useState(false);

  const [notices] = useState<Notice[]>(initialNotices);
  const [filter, setFilter] = useState<"Todos" | Category>("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = notices.filter((n) => {
    const matchCat = filter === "Todos" || n.category === filter;
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const categories = ["Todos", "Geral", "Eventos", "Provas", "Esportes", "Urgente"] as const;

  return (
    <div className="min-h-screen bg-gray-50 relative">
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
              <User className="w-6 h-6" />
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
            
            <Link href="/professor/atividades" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="font-medium">Atividades</span>
            </Link>

            <Link href="/professor/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-[#5B3A9A] bg-purple-50 rounded-md transition-colors group">
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="font-medium">Mural de avisos</span>
            </Link>

            <Link href="/professor/horarios" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
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
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#5B3A9A]">Mural Escolar</h1>
            <p className="text-gray-500 mt-1">Fique por dentro das últimas novidades e comunicados.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-[#5B3A9A] hover:bg-[#5B3A9A]/90 text-white px-5 py-2.5 rounded-full shadow-md transition-all hover:shadow-lg w-full md:w-auto font-medium"
          >
            <Plus size={20} />
            Novo aviso
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  filter === c 
                    ? "bg-[#5B3A9A] text-white shadow-md" 
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-[#5B3A9A]/30"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#5B3A9A] transition-colors" />
            <input
              type="text"
              placeholder="Buscar avisos..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5B3A9A]/20 focus:border-[#5B3A9A] transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={n.id} 
                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#5B3A9A]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border", categoryStyles[n.category])}>
                      {n.category}
                    </span>
                    <div className="flex flex-col items-end text-xs text-gray-400">
                      <span className="flex items-center gap-1 font-medium text-gray-500">
                        <Calendar className="w-3 h-3" /> 
                        {new Date(n.date).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-[#5B3A9A] transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {n.content}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <User className="w-3.5 h-3.5 text-[#40C0B4]" />
                    <span>Por: <span className="font-medium text-gray-700">{n.author}</span></span>
                  </div>
                  {n.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-[#40C0B4]" />
                      <span>Local: <span className="font-medium text-gray-700">{n.location}</span></span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum aviso encontrado</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou termos de busca.</p>
          </div>
        )}

        {isModalOpen && <NewNoticeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

      </main>
    </div>
  );
}