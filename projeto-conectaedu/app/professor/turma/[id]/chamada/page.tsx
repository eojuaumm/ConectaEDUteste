'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, 
  Search, 
  User, 
  Check, 
  X, 
  Clock3, 
  MoreVertical,
  ChevronLeft, 
  AlertCircle, 
  Save 
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
  statusChamada: 'Presente' | 'Falta' | 'Atraso' | 'Pendente';
}

const listaAlunosMock: Aluno[] = [
  { id: 1, nome: "eojuaumm", matricula: "2023001", statusChamada: "Presente" },
  { id: 2, nome: "Light Mary", matricula: "2023002", statusChamada: "Falta" },
  { id: 3, nome: "hdoisoo", matricula: "2023003", statusChamada: "Atraso" },
  { id: 4, nome: "Linas", matricula: "2023004", statusChamada: "Pendente" },
  { id: 5, nome: "Guguinha", matricula: "2023005", statusChamada: "Presente" },
  { id: 6, nome: "Isa", matricula: "2023006", statusChamada: "Pendente" },
];

const ChamadaAlunosScreen = () => {
  const router = useRouter();
  const [alunos, setAlunos] = useState(listaAlunosMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | Aluno['statusChamada']>('Todos');

  const handleAtualizarChamada = (alunoId: number, novoStatus: Aluno['statusChamada']) => {
    setAlunos(alunos.map(aluno =>
      aluno.id === alunoId ? { ...aluno, statusChamada: novoStatus } : aluno
    ));
  };

  const renderStatusTag = (status: Aluno['statusChamada']) => {
    let bgColor: string;
    let textColor: string;
    let icon: React.ReactNode;
    let text: string;

    switch (status) {
      case 'Presente':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        icon = <Check className="w-3 h-3 mr-1" />;
        text = 'Presente';
        break;
      case 'Falta':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        icon = <X className="w-3 h-3 mr-1" />;
        text = 'Falta';
        break;
      case 'Atraso':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-700';
        icon = <Clock3 className="w-3 h-3 mr-1" />;
        text = 'Atraso';
        break;
      case 'Pendente':
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-500';
        icon = <MoreVertical className="w-3 h-3 mr-1" />;
        text = 'Pendente';
        break;
    }

    return (
      <span className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full uppercase border",
        bgColor,
        textColor,
        `border-${bgColor.split('-')[1]}-200`
      )}>
        {icon}
        {text}
      </span>
    );
  };

  const alunosFiltrados = alunos.filter(aluno => {
    const matchTexto = aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       aluno.matricula.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' ? true : aluno.statusChamada === filtroStatus;
    
    return matchTexto && matchStatus;
  });

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
                    <User className="w-6 h-6 text-[#5B3A9A]" />
                    Chamada - 6º Fundo A
                </h1>
            </div>
            
            <button 
                onClick={() => alert("Função de Salvar Chamada implementada!")}
                className="bg-[#5B3A9A] hover:bg-[#4a2e80] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Salvar Chamada</span>
            </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:flex-1">
            <input
              type="text"
              placeholder="Buscar aluno por nome ou matrícula..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value as 'Todos' | Aluno['statusChamada'])}
              className="w-full sm:w-48 py-2 px-4 border border-gray-300 rounded-lg focus:ring-[#5B3A9A] focus:border-[#5B3A9A] bg-white text-sm"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Presente">Presente</option>
              <option value="Falta">Falta</option>
              <option value="Atraso">Atraso</option>
              <option value="Pendente">Pendente</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {alunosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Nenhum aluno encontrado com os critérios de busca/filtro.</p>
            </div>
          ) : (
            alunosFiltrados.map((aluno) => (
              <div
                key={aluno.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{aluno.nome}</p>
                    <p className="text-sm text-gray-500">Matrícula: {aluno.matricula}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  {renderStatusTag(aluno.statusChamada)}

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAtualizarChamada(aluno.id, 'Presente')}
                      title="Marcar Presente"
                      className={cn(
                        "p-2 rounded-lg transition-colors border",
                        aluno.statusChamada === 'Presente' ? 'bg-green-500 text-white border-green-500' : 'bg-gray-100 text-green-500 hover:bg-green-50 border-gray-200'
                      )}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAtualizarChamada(aluno.id, 'Falta')}
                      title="Marcar Falta"
                      className={cn(
                        "p-2 rounded-lg transition-colors border",
                        aluno.statusChamada === 'Falta' ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 text-red-500 hover:bg-red-50 border-gray-200'
                      )}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAtualizarChamada(aluno.id, 'Atraso')}
                      title="Marcar Atraso"
                      className={cn(
                        "p-2 rounded-lg transition-colors border",
                        aluno.statusChamada === 'Atraso' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-gray-100 text-yellow-500 hover:bg-yellow-50 border-gray-200'
                      )}
                    >
                      <Clock3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAtualizarChamada(aluno.id, 'Pendente')}
                      title="Limpar Status"
                      className={cn(
                        "p-2 rounded-lg transition-colors border",
                        aluno.statusChamada === 'Pendente' ? 'bg-gray-400 text-white border-gray-400' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-gray-200'
                      )}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default ChamadaAlunosScreen;