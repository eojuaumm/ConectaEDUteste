'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Search, Plus } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// --- Tipos ---
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

const categoryColors: Record<Category, string> = {
  Geral: "bg-gray-100 text-gray-700 border-gray-300",
  Eventos: "bg-blue-100 text-blue-700 border-blue-300",
  Provas: "bg-red-100 text-red-700 border-red-300",
  Esportes: "bg-green-100 text-green-700 border-green-300",
  Urgente: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

// --- Dados iniciais ---
const initialNotices: Notice[] = [
  { id: "1", title: "Feira de Ciências 2024", content: "Preparem seus projetos! As inscrições para a feira anual de ciências estão abertas.", date: "2024-05-20", location: "Ginásio", category: "Eventos", author: "Coordenação" },
  { id: "2", title: "Prova de Matemática - 9º Ano", content: "Conteúdo: Álgebra Linear e Funções do Segundo Grau. Estudem com antecedência!", date: "2024-06-15", category: "Provas", author: "Prof. Lúcia" },
  { id: "3", title: "Treino de Vôlei Cancelado", content: "O treino de vôlei desta tarde foi cancelado devido a manutenção na quadra.", date: "2024-05-18", location: "Quadra Poliesportiva", category: "Esportes", author: "Treinador Marcos" },
  { id: "4", title: "Reunião de Pais e Mestres", content: "Agenda: desempenho acadêmico, planejamento do segundo semestre e novos projetos pedagógicos.", date: "2024-06-01", location: "Auditório Principal", category: "Eventos", author: "Diretoria" },
  { id: "5", title: "Alerta: Vazamento de Água no Bloco C", content: "O acesso ao Bloco C está temporariamente interditado.", date: "2024-05-19", category: "Urgente", author: "Zeladoria" },
  { id: "6", title: "Início do Clube de Leitura", content: "Nosso primeiro livro será 'Dom Casmurro'. Inscrevam-se na biblioteca.", date: "2024-06-10", location: "Biblioteca", category: "Geral", author: "Prof. Ana" },
  { id: "7", title: "Campeonato de Futsal Interclasses", content: "Tabela de jogos disponível no mural da quadra.", date: "2024-05-25", category: "Esportes", author: "Grêmio Estudantil" },
  { id: "8", title: "Segunda Chamada - Biologia", content: "A prova será realizada na sala 301.", date: "2024-06-05", location: "Sala 301", category: "Provas", author: "Prof. Carlos" },
  { id: "9", title: "Aviso de Feriado Prolongado", content: "Não haverá aulas nos dias 20 e 21 de Junho.", date: "2024-06-20", category: "Geral", author: "Secretaria" },
  { id: "10", title: "Inscrições para Intercâmbio Cultural", content: "Prazo final para entrega de documentos.", date: "2024-05-30", location: "Secretaria", category: "Eventos", author: "Coordenação" },
  { id: "11", title: "Vaga de Estágio - Biblioteca", content: "Vaga para alunos do 3º ano. Enviar currículo.", date: "2024-05-22", category: "Geral", author: "RH Escolar" },
  { id: "12", title: "Doação de Agasalhos", content: "A campanha anual começou!", date: "2024-06-10", category: "Geral", author: "Grêmio Estudantil" },
];

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

// --- Modal simplificado (mantive mínimo funcional para evitar erros) ---
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
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.button
          aria-label="fechar modal"
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          className="relative z-10 bg-white rounded-xl p-8 w-full max-w-md shadow-xl"
        >
          <h2 className="text-lg font-bold mb-4 text-slate-900">Novo Aviso</h2>
          <p className="text-sm text-slate-600 mb-6">(Formulário intencionalmente mínimo neste exemplo.)</p>
          <div className="flex justify-end gap-2 pt-4">
            <button onClick={onClose} className="px-4 py-2 rounded-md border">Cancelar</button>
            <button onClick={() => { onSave?.(); onClose(); }} className="px-4 py-2 rounded-md bg-slate-900 text-white">Salvar</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// --- Página principal ---
export default function NoticeBoard() {
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
    <div className="min-h-screen w-full relative p-10 bg-[#5a33a8] overflow-hidden">
      {/* Ondinha roxo claro (SVG em background) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"100%25\" height=\"100%25\" viewBox=\"0 0 1440 320\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath fill=\"%23d6c4ff\" fill-opacity=\"1\" d=\"M0,256L60,245.3C120,235,240,213,360,181.3C480,149,600,107,720,112C840,117,960,171,1080,176C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z\"%3E%3C/path%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      {/* Imagem de fundo (fundo.png) */}
      <div className="absolute inset-0 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/fundo.png')" }} />

      <div className="relative max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-bold drop-shadow-lg">Mural Escolar</h1>
        <p className="text-sm opacity-80 -mt-1">Acompanhe as últimas novidades.</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white text-slate-700 shadow"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black/80 hover:bg-black text-white px-4 py-2 rounded-full shadow"
          >
            <Plus size={18} />
            Novo aviso
          </button>
        </div>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium",
                filter === c ? "bg-white text-[#5a33a8] shadow" : "bg-[#441f8a] text-white/90 hover:bg-[#4f27a0]"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filtered.map((n) => (
            <div key={n.id} className="bg-white text-slate-700 rounded-2xl p-6 shadow-lg border border-slate-100">
              <div className="flex justify-between items-start mb-3">
                <span className={cn("px-3 py-1 rounded-md text-xs font-semibold border", categoryColors[n.category])}>
                  {n.category}
                </span>
                <span className="text-xs flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" /> {n.author}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{n.title}</h3>
              <p className="text-sm mt-2 mb-4 text-slate-600">{n.content}</p>

              <div className="flex items-center gap-2 text-sm text-slate-500 border-t pt-4">
                <Calendar className="w-4 h-4 text-slate-400" />
                {new Date(n.date).toLocaleDateString("pt-BR")}
              </div>
            </div>
          ))}
        </div>

        {/* CORREÇÃO: remover aspas extra - modal */}
        {isModalOpen && <NewNoticeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}
