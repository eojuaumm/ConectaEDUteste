'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  BookOpen, 
  Plus,
  Calendar,
  Search,
  X,
  Save,
  Pencil,
  Trash2,
  Target,
  FileText,
  GraduationCap,
  Eye
} from 'lucide-react';

interface PlanoAula {
  id: number;
  titulo: string;
  data: string;
  conteudo: string;
  objetivos: string;
  materiais: string;
  metodologia: string;
  avaliacao: string;
}

const planosIniciais: PlanoAula[] = [
  {
    id: 1,
    titulo: 'Introdução às Equações do 1º Grau',
    data: '2025-12-10',
    conteudo: 'Conceitos básicos de equações, resolução de equações simples, aplicações práticas',
    objetivos: 'Compreender o conceito de equação; Resolver equações do 1º grau; Aplicar equações em situações-problema',
    materiais: 'Quadro branco, canetas coloridas, folhas de exercícios, calculadora',
    metodologia: 'Aula expositiva dialogada, resolução de exercícios em grupo, atividades práticas',
    avaliacao: 'Lista de exercícios, participação em aula, trabalho em grupo'
  },
  {
    id: 2,
    titulo: 'Revisão de Frações e Operações',
    data: '2025-12-08',
    conteudo: 'Frações equivalentes, adição e subtração de frações, multiplicação e divisão',
    objetivos: 'Revisar operações com frações; Resolver problemas envolvendo frações; Consolidar conhecimentos',
    materiais: 'Material manipulativo (fração de papel), exercícios, calculadora',
    metodologia: 'Aula prática com material manipulativo, exercícios individuais e em duplas',
    avaliacao: 'Exercícios práticos, avaliação formativa'
  },
  {
    id: 3,
    titulo: 'Geometria: Área e Perímetro',
    data: '2025-12-05',
    conteudo: 'Cálculo de área e perímetro de figuras planas (quadrado, retângulo, triângulo)',
    objetivos: 'Calcular área e perímetro; Identificar fórmulas corretas; Resolver problemas geométricos',
    materiais: 'Régua, compasso, folhas milimetradas, exercícios práticos',
    metodologia: 'Aula prática com construção de figuras, resolução de problemas reais',
    avaliacao: 'Atividade prática de medição, prova escrita'
  },
];

export default function PlanoAulasPage() {
  const router = useRouter();
  const params = useParams();
  const [planos, setPlanos] = useState<PlanoAula[]>(planosIniciais);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroData, setFiltroData] = useState<'todos' | 'hoje' | 'semana' | 'mes'>('todos');
  
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [planoVisualizando, setPlanoVisualizando] = useState<PlanoAula | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  
  const [formTitulo, setFormTitulo] = useState('');
  const [formData, setFormData] = useState('');
  const [formConteudo, setFormConteudo] = useState('');
  const [formObjetivos, setFormObjetivos] = useState('');
  const [formMateriais, setFormMateriais] = useState('');
  const [formMetodologia, setFormMetodologia] = useState('');
  const [formAvaliacao, setFormAvaliacao] = useState('');

  const abrirModal = (plano?: PlanoAula) => {
    if (plano) {
      setEditandoId(plano.id);
      setFormTitulo(plano.titulo);
      setFormData(plano.data);
      setFormConteudo(plano.conteudo);
      setFormObjetivos(plano.objetivos);
      setFormMateriais(plano.materiais);
      setFormMetodologia(plano.metodologia);
      setFormAvaliacao(plano.avaliacao);
    } else {
      setEditandoId(null);
      setFormTitulo('');
      setFormData(new Date().toISOString().split('T')[0]);
      setFormConteudo('');
      setFormObjetivos('');
      setFormMateriais('');
      setFormMetodologia('');
      setFormAvaliacao('');
    }
    setModalAberto(true);
  };

  const visualizarPlano = (plano: PlanoAula) => {
    setPlanoVisualizando(plano);
    setModalVisualizar(true);
  };

  const salvarPlano = (e: React.FormEvent) => {
    e.preventDefault();

    if (editandoId) {
      setPlanos(prev => prev.map(item => 
        item.id === editandoId 
          ? { 
              ...item, 
              titulo: formTitulo,
              data: formData,
              conteudo: formConteudo,
              objetivos: formObjetivos,
              materiais: formMateriais,
              metodologia: formMetodologia,
              avaliacao: formAvaliacao
            }
          : item
      ));
    } else {
      const novoPlano: PlanoAula = {
        id: Date.now(),
        titulo: formTitulo,
        data: formData,
        conteudo: formConteudo,
        objetivos: formObjetivos,
        materiais: formMateriais,
        metodologia: formMetodologia,
        avaliacao: formAvaliacao
      };
      setPlanos([novoPlano, ...planos]);
    }
    setModalAberto(false);
  };

  const deletarPlano = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este plano de aula?')) {
      setPlanos(prev => prev.filter(item => item.id !== id));
    }
  };

  const planosFiltrados = planos.filter(plano => {
    const matchTexto = plano.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       plano.conteudo.toLowerCase().includes(termoBusca.toLowerCase());
    
    const hoje = new Date();
    const dataPlano = new Date(plano.data);
    const diffTime = dataPlano.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let matchData = true;
    if (filtroData === 'hoje') {
      matchData = diffDays === 0;
    } else if (filtroData === 'semana') {
      matchData = diffDays >= 0 && diffDays <= 7;
    } else if (filtroData === 'mes') {
      matchData = diffDays >= 0 && diffDays <= 30;
    }
    
    return matchTexto && matchData;
  });

  const turmaIdRaw = (Array.isArray(params?.id) ? params.id[0] : params?.id) || '';

  const getTurmaInfo = (id: string) => {
    if (!id) return { titulo: 'Carregando...' };
    const partes = id.split('-');
    const letra = partes[partes.length - 1]; 
    const codigoAno = partes.slice(0, -1).join('-'); 
    const mapasAnos: Record<string, string> = {
      '6-fund': '6º Ano',
      '7-fund': '7º Ano',
      '8-fund': '8º Ano',
      '9-fund': '9º Ano',
      '1-medio': '1º Ano',
      '2-medio': '2º Ano',
      '3-medio': '3º Ano',
    };
    const tituloAno = mapasAnos[codigoAno] || 'Turma Desconhecida';
    return { titulo: `${tituloAno} ${letra}` };
  };

  const turmaInfo = getTurmaInfo(turmaIdRaw);

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
                    <BookOpen className="w-6 h-6 text-pink-500" />
                    Plano de Aulas - {turmaInfo.titulo}
                </h1>
           </div>
           
           <button 
                onClick={() => abrirModal()}
                className="bg-[#5B3A9A] hover:bg-[#4a2e80] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
           >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo Plano</span>
           </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:flex-1">
                <input 
                    type="text" 
                    placeholder="Buscar por título ou conteúdo..." 
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
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value as typeof filtroData)}
                    className="w-full sm:w-48 py-2 px-4 border border-gray-300 rounded-lg focus:ring-[#5B3A9A] focus:border-[#5B3A9A] bg-white text-sm flex items-center gap-2"
                >
                    <option value="todos">Todas as Datas</option>
                    <option value="hoje">Hoje</option>
                    <option value="semana">Próxima Semana</option>
                    <option value="mes">Próximo Mês</option>
                </select>
            </div>
        </div>

        <div className="space-y-4">
            {planosFiltrados.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Nenhum plano de aula encontrado</p>
                    <p className="text-sm">Crie um novo plano de aula para começar</p>
                </div>
            ) : (
                planosFiltrados.map((plano) => (
                    <div key={plano.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all hover:shadow-md">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{plano.titulo}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(plano.data).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => visualizarPlano(plano)}
                                    className="p-2 text-gray-500 hover:text-[#5B3A9A] hover:bg-purple-50 rounded-lg transition-colors"
                                    title="Visualizar"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => abrirModal(plano)}
                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => deletarPlano(plano.id)}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Excluir"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    Conteúdo:
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">{plano.conteudo}</p>
                            </div>
                            
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                                    <Target className="w-3 h-3" />
                                    Objetivos:
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">{plano.objetivos}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
                    <h2 className="text-lg font-bold text-gray-800">
                        {editandoId ? 'Editar Plano de Aula' : 'Novo Plano de Aula'}
                    </h2>
                    <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={salvarPlano} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título/Tema *</label>
                            <input 
                                required
                                type="text" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none transition-all"
                                value={formTitulo}
                                onChange={e => setFormTitulo(e.target.value)}
                                placeholder="Ex: Introdução às Equações do 1º Grau"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                            <input 
                                required
                                type="date" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none"
                                value={formData}
                                onChange={e => setFormData(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo Programático *</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none resize-none"
                            value={formConteudo}
                            onChange={e => setFormConteudo(e.target.value)}
                            placeholder="Descreva o conteúdo que será abordado na aula..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Objetivos de Aprendizagem *</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none resize-none"
                            value={formObjetivos}
                            onChange={e => setFormObjetivos(e.target.value)}
                            placeholder="Liste os objetivos que os alunos devem alcançar..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Materiais Necessários</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none"
                            value={formMateriais}
                            onChange={e => setFormMateriais(e.target.value)}
                            placeholder="Ex: Quadro branco, canetas, folhas de exercícios..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Metodologia</label>
                        <textarea 
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none resize-none"
                            value={formMetodologia}
                            onChange={e => setFormMetodologia(e.target.value)}
                            placeholder="Descreva como a aula será conduzida..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação</label>
                        <textarea 
                            rows={2}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent outline-none resize-none"
                            value={formAvaliacao}
                            onChange={e => setFormAvaliacao(e.target.value)}
                            placeholder="Descreva como será avaliado o aprendizado..."
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
                            Salvar Plano
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {modalVisualizar && planoVisualizando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8">
                <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center z-10">
                    <h2 className="text-lg font-bold text-gray-800">Visualizar Plano de Aula</h2>
                    <button onClick={() => setModalVisualizar(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{planoVisualizando.titulo}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(planoVisualizando.data).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-[#5B3A9A]" />
                                Conteúdo Programático
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{planoVisualizando.conteudo}</p>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4 text-[#5B3A9A]" />
                                Objetivos de Aprendizagem
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{planoVisualizando.objetivos}</p>
                        </div>

                        {planoVisualizando.materiais && (
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-[#5B3A9A]" />
                                    Materiais Necessários
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{planoVisualizando.materiais}</p>
                            </div>
                        )}

                        {planoVisualizando.metodologia && (
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-[#5B3A9A]" />
                                    Metodologia
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{planoVisualizando.metodologia}</p>
                            </div>
                        )}

                        {planoVisualizando.avaliacao && (
                            <div>
                                <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-[#5B3A9A]" />
                                    Avaliação
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{planoVisualizando.avaliacao}</p>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <button 
                            onClick={() => {
                                setModalVisualizar(false);
                                abrirModal(planoVisualizando);
                            }}
                            className="px-4 py-2 bg-[#5B3A9A] text-white rounded-lg font-medium hover:bg-[#4a2e80] transition-colors flex items-center gap-2"
                        >
                            <Pencil className="w-4 h-4" />
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}

