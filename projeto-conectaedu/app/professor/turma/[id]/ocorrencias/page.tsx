'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  AlertCircle, 
  Plus,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle2,
  Filter,
  X,
  Save,
  Pencil,
  Search
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

type Gravidade = 'baixa' | 'media' | 'alta';

interface Ocorrencia {
  id: number;
  aluno: string;
  data: string;
  tipo: string;
  gravidade: Gravidade;
  descricao: string;
  resolvido: boolean;
}

const dadosIniciais: Ocorrencia[] = [
  {
    id: 1,
    aluno: "João Silva",
    data: "2025-12-04",
    tipo: "Indisciplina",
    gravidade: "media",
    descricao: "Conversando excessivamente durante a explicação da matéria.",
    resolvido: false
  },
  {
    id: 2,
    aluno: "Maria Oliveira",
    data: "2025-12-02",
    tipo: "Atraso",
    gravidade: "baixa",
    descricao: "Chegou 20 minutos após o início da aula.",
    resolvido: true
  },
  {
    id: 3,
    aluno: "Pedro Santos",
    data: "2025-11-28",
    tipo: "Tarefa não entregue",
    gravidade: "baixa",
    descricao: "Não entregou o trabalho de casa sobre equações.",
    resolvido: false
  },
];

export default function OcorrenciasPage() {
  const router = useRouter();
  const params = useParams();

  const [listaOcorrencias, setListaOcorrencias] = useState<Ocorrencia[]>(dadosIniciais);
  const [termoBusca, setTermoBusca] = useState('');
  const [mostrarApenasPendentes, setMostrarApenasPendentes] = useState(false);
  
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  
  const [formAluno, setFormAluno] = useState('');
  const [formTipo, setFormTipo] = useState('');
  const [formGravidade, setFormGravidade] = useState<Gravidade>('baixa');
  const [formDescricao, setFormDescricao] = useState('');


  const abrirModal = (ocorrencia?: Ocorrencia) => {
    if (ocorrencia) {
      setEditandoId(ocorrencia.id);
      setFormAluno(ocorrencia.aluno);
      setFormTipo(ocorrencia.tipo);
      setFormGravidade(ocorrencia.gravidade);
      setFormDescricao(ocorrencia.descricao);
    } else {
      setEditandoId(null);
      setFormAluno('');
      setFormTipo('');
      setFormGravidade('baixa');
      setFormDescricao('');
    }
    setModalAberto(true);
  };

  const salvarOcorrencia = (e: React.FormEvent) => {
    e.preventDefault();

    if (editandoId) {
      setListaOcorrencias(prev => prev.map(item => 
        item.id === editandoId 
          ? { ...item, aluno: formAluno, tipo: formTipo, gravidade: formGravidade, descricao: formDescricao }
          : item
      ));
    } else {
      const novaOcorrencia: Ocorrencia = {
        id: Date.now(),
        aluno: formAluno,
        data: new Date().toISOString().split('T')[0],
        tipo: formTipo,
        gravidade: formGravidade,
        descricao: formDescricao,
        resolvido: false
      };
      setListaOcorrencias([novaOcorrencia, ...listaOcorrencias]);
    }
    setModalAberto(false);
  };

  const alternarResolvido = (id: number) => {
    setListaOcorrencias(prev => prev.map(item => 
      item.id === id ? { ...item, resolvido: !item.resolvido } : item
    ));
  };

  const ocorrenciasFiltradas = listaOcorrencias.filter(item => {
    const matchTexto = item.aluno.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       item.tipo.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = mostrarApenasPendentes ? !item.resolvido : true;
    
    return matchTexto && matchStatus;
  });

  const getGravidadeColor = (gravidade: string) => {
    switch (gravidade) {
      case 'alta': return 'bg-red-100 text-red-700 border-red-200';
      case 'media': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
                <button 
                    onClick={() => router.back()} 
                    className="p-2 -ml-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                    Ocorrências
                </h1>
           </div>
           
           <button 
                onClick={() => abrirModal()}
                className="bg-[#5B3A9A] hover:bg-[#4a2e80] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
           >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nova Ocorrência</span>
           </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:flex-1">
                <input 
                    type="text" 
                    placeholder="Buscar por aluno ou tipo..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                    onClick={() => setMostrarApenasPendentes(!mostrarApenasPendentes)}
                    className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border w-full sm:w-auto justify-center",
                        mostrarApenasPendentes 
                            ? "bg-orange-50 text-orange-700 border-orange-200" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                >
                    <Filter className="w-4 h-4" />
                    {mostrarApenasPendentes ? "Vendo Pendentes" : "Todos Status"}
                </button>
            </div>
        </div>

        <div className="space-y-4">
            {ocorrenciasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>Nenhuma ocorrência encontrada.</p>
                </div>
            ) : (
                ocorrenciasFiltradas.map((ocorrencia) => (
                    <div key={ocorrencia.id} className={cn(
                        "bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all hover:shadow-md",
                        ocorrencia.resolvido ? "opacity-75 bg-gray-50" : null
                    )}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{ocorrencia.aluno}</h3>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(ocorrencia.data).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase", getGravidadeColor(ocorrencia.gravidade))}>
                                    {ocorrencia.gravidade}
                                </span>
                                {ocorrencia.resolvido ? (
                                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                        <CheckCircle2 className="w-3 h-3" /> Resolvido
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                                        <AlertTriangle className="w-3 h-3" /> Pendente
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="pl-0 sm:pl-13">
                            <p className="text-sm font-bold text-gray-800 mb-1">
                                {ocorrencia.tipo}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {ocorrencia.descricao}
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-2">
                             <button 
                                onClick={() => abrirModal(ocorrencia)}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#5B3A9A] font-medium px-3 py-1 transition-colors"
                             >
                                <Pencil className="w-3 h-3" /> Editar
                             </button>
                             
                            <button 
                                onClick={() => alternarResolvido(ocorrencia.id)}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium px-3 py-1 border rounded-md transition-colors",
                                    ocorrencia.resolvido 
                                        ? "text-gray-500 border-gray-200 hover:bg-gray-100"
                                        : "text-[#5B3A9A] border-[#5B3A9A] hover:bg-[#5B3A9A]/5"
                                )}
                            >
                                {ocorrencia.resolvido ? (
                                    <>Reabrir</>
                                ) : (
                                    <>Marcar Concluído</>
                                )}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">
                        {editandoId ? 'Editar Ocorrência' : 'Nova Ocorrência'}
                    </h2>
                    <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={salvarOcorrencia} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Aluno</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none transition-all"
                            value={formAluno}
                            onChange={e => setFormAluno(e.target.value)}
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <input 
                                required
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none"
                                value={formTipo}
                                onChange={e => setFormTipo(e.target.value)}
                                placeholder="Ex: Atraso"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gravidade</label>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] outline-none bg-white"
                                value={formGravidade}
                                onChange={e => setFormGravidade(e.target.value as Gravidade)}
                            >
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none resize-none"
                            value={formDescricao}
                            onChange={e => setFormDescricao(e.target.value)}
                            placeholder="Detalhes do ocorrido..."
                        />
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button 
                            type="button"
                            onClick={() => setModalAberto(false)}
                            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-2.5 bg-[#5B3A9A] text-white rounded-lg font-medium hover:bg-[#4a2e80] transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}