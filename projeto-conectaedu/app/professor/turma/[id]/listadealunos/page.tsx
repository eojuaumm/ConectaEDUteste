'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  User, 
  ChevronLeft, 
  Save,
  Pencil,
  X,
  Plus
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
}

const listaAlunosMock: Aluno[] = [
  { id: 1, nome: "eojuaumm", matricula: "2023001" },
  { id: 2, nome: "Light Mary", matricula: "2023002" },
  { id: 3, nome: "hdoisoo", matricula: "2023003" },
  { id: 4, nome: "Linas", matricula: "2023004" },
  { id: 5, nome: "Guguinha", matricula: "2023005" },
  { id: 6, nome: "Isa", matricula: "2023006" },
];

interface FormularioDados {
    id: number | null;
    nome: string;
    matricula: string;
}


const GestaoAlunosScreen = () => {
  const router = useRouter();
  const [alunos, setAlunos] = useState(listaAlunosMock);
  const [termoBusca, setTermoBusca] = useState('');
  
  const [modalAberto, setModalAberto] = useState(false);
  const [formDados, setFormDados] = useState<FormularioDados>({ id: null, nome: '', matricula: '' });

  
  const abrirModal = (aluno?: Aluno) => {
    if (aluno) {
      setFormDados({ id: aluno.id, nome: aluno.nome, matricula: aluno.matricula });
    } else {
      setFormDados({ id: null, nome: '', matricula: '' }); 
    }
    setModalAberto(true);
  };

  
  const salvarAluno = (e: React.FormEvent) => {
    e.preventDefault();

    if (formDados.id !== null) {
      setAlunos(prev => prev.map(aluno => 
        aluno.id === formDados.id 
          ? { ...aluno, nome: formDados.nome, matricula: formDados.matricula }
          : aluno
      ));
    } else {
      const novoAluno: Aluno = {
        id: Date.now(), 
        nome: formDados.nome,
        matricula: formDados.matricula,
      };
      setAlunos([novoAluno, ...alunos]);
    }
    setModalAberto(false);
  };

  
  const alunosFiltrados = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    aluno.matricula.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
                    Gestão de Alunos - 6º Fundo A
                </h1>
            </div>
            
            <button 
                onClick={() => abrirModal()}
                className="bg-[#5B3A9A] hover:bg-[#4a2e80] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Aluno</span>
            </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full">
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
        </div>

        <div className="space-y-4">
          {alunosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Nenhum aluno encontrado.</p>
            </div>
          ) : (
            alunosFiltrados.map((aluno) => (
              <div
                key={aluno.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className='min-w-0'>
                    <p className="text-lg font-semibold text-gray-900 truncate">{aluno.nome}</p>
                    <p className="text-sm text-gray-500">Matrícula: {aluno.matricula}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => abrirModal(aluno)}
                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#5B3A9A] font-medium px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="w-4 h-4" /> 
                    Editar Dados
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
                        {formDados.id ? 'Editar Aluno' : 'Adicionar Novo Aluno'}
                    </h2>
                    <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={salvarAluno} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none transition-all"
                            value={formDados.nome}
                            onChange={e => setFormDados(prev => ({...prev, nome: e.target.value}))}
                            placeholder="Ex: João Silva"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none"
                            value={formDados.matricula}
                            onChange={e => setFormDados(prev => ({...prev, matricula: e.target.value}))}
                            placeholder="Ex: 2023001"
                        />
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-[#5B3A9A] text-white rounded-lg font-medium hover:bg-[#4a2e80] transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {formDados.id ? 'Salvar Alterações' : 'Adicionar Aluno'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}

export default GestaoAlunosScreen;