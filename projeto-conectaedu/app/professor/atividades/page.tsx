'use client'; 

import React, { useState, useCallback } from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; 

// 🚨 SIMULAÇÃO DE UTILS: cn (deve ser importado de 'clsx' ou 'tailwind-merge')
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

// 🚨 SIMULAÇÃO DE COMPONENTES DE ICONES (Refletindo o estilo de contorno/outline)
const IconBase = (props: any, paths: string[]) => (
  <svg 
    {...props} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth={2}
  >
    {paths.map((d, index) => <path key={index} d={d} />)}
  </svg>
);

const Menu = (props: any) => IconBase(props, ["M4 6h16M4 12h16M4 18h16"]);
const User = (props: any) => IconBase(props, ["M16 7a4 4 0 11-8 0 4 4 0 018 0z", "M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"]);
const Search = (props: any) => IconBase(props, ["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"]);
const BookOpen = (props: any) => IconBase(props, ["M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"]); 
const Calendar = (props: any) => IconBase(props, ["M3 9a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z", "M17 4v2", "M7 4v2", "M3 10h18"]); 
const Clock = (props: any) => IconBase(props, ["M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"]); 
const Users = (props: any) => IconBase(props, ["M17 17h-2", "M15 15l-1-1", "M17 19h-2", "M17 10h-2", "M19 12h-2", "M19 14h-2", "M5 12h2", "M7 14h2", "M5 16h2", "M7 18h2", "M12 2a10 10 0 100 20 10 10 0 000-20z"]); 
const FileText = (props: any) => IconBase(props, ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M10 13h4", "M10 17h4", "M10 9h-2"]); 
const LogOut = (props: any) => IconBase(props, ["M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"]);
const Phone = (props: any) => IconBase(props, ["M3 5a2 2 0 012-2h3.5l1.8 3.6a1 1 0 01-.2 1l-2.7 2.7a12 12 0 008 8l2.7-2.7a1 1 0 011-.2l3.6 1.8V19a2 2 0 01-2 2h-4a14 14 0 01-14-14V5z"]);

// 🎨 CORES E CONSTANTES (Mantidas)
const PRIMARY_COLOR = '#5B3A9A'; 
const TEXT_DARK = '#1F2937';

// ⚙️ Estrutura de Dados (Mantida)
interface Activity {
  id: string;
  title: string;
  subject: string; 
  description: string;
  dueDate: string; 
}

const initialActivities: Activity[] = [
  { id: 'a1', title: 'Prova: Funções Matemáticas', subject: 'Matemática', description: 'Conteúdo: Módulo 3, Capítulos 1 a 4. Aplicada à turma 9º Ano A.', dueDate: '2025-12-15' },
  { id: 'a2', title: 'Relatório: Efeito Estufa', subject: 'Geografia', description: 'Pesquisa e relatório individual sobre as causas e consequências do efeito estufa.', dueDate: '2025-12-10' },
  { id: 'a3', title: 'Trabalho: Revolução Industrial', subject: 'História', description: 'Trabalho em grupo sobre a Segunda Revolução Industrial. Critérios de avaliação detalhados no anexo.', dueDate: '2025-12-20' },
];

// 📋 Componente de Modal para Adicionar/Editar Atividade (Omitido por brevidade, pois não foi alterado)
const ActivityFormModal: React.FC<{
  activity: Activity | null;
  onSave: (act: Activity) => void;
  onClose: () => void;
  isNew: boolean;
}> = ({ activity, onSave, onClose, isNew }) => {
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>(
    activity ? { ...activity } : { title: '', subject: '', description: '', dueDate: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activityToSave: Activity = { 
      ...formData, 
      id: activity?.id || Date.now().toString() 
    };
    onSave(activityToSave);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2" style={{ color: PRIMARY_COLOR }}>
          {isNew ? 'ADICIONAR NOVA ATIVIDADE' : 'EDITAR ATIVIDADE'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Matéria</label>
            <input 
              type="text" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange} 
              className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={3} 
              className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Entrega</label>
            <input 
              type="date" 
              name="dueDate" 
              value={formData.dueDate} 
              onChange={handleChange} 
              className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end pt-4 space-x-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              style={{ backgroundColor: PRIMARY_COLOR }}
              className="px-6 py-2 text-white font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition"
            >
              {isNew ? 'Adicionar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 📇 Componente para cada Atividade na Lista (Omitido por brevidade, pois não foi alterado)
const ProfessorActivityCard: React.FC<{ 
  activity: Activity, 
  onEdit: (act: Activity) => void, 
  onDelete: (id: string) => void 
}> = ({ activity, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border-b-2 border-gray-100 transition duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <span 
            className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Cadastrada
          </span>
          <h3 className="text-lg font-semibold mt-1" style={{ color: TEXT_DARK }}>
            {activity.title}
          </h3>
          <p className="text-sm text-gray-500">
            **{activity.subject}** | Entrega: **{activity.dueDate}**
          </p>
        </div>
        
        {/* Botões de Ação */}
        <div className='flex space-x-2 text-gray-500 ml-4 pt-1'>
          <button 
            onClick={() => onEdit(activity)}
            className="p-1 rounded-full hover:bg-gray-100 hover:text-indigo-600 transition"
            title="Editar Atividade"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
          <button 
            onClick={() => onDelete(activity.id)}
            className="p-1 rounded-full hover:bg-red-50 hover:text-red-600 transition"
            title="Excluir Atividade"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12H6L5 7m5 0V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8"/></svg>
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2 italic border-t pt-2">
        {activity.description}
      </p>
    </div>
  );
};

// 📜 Componente Principal da Listagem de Atividades (Professor) (Omitido por brevidade, pois não foi alterado)
const ProfessorActivitiesPanel: React.FC<any> = ({ 
  activities, 
  handleDeleteActivity, 
  setActivityToEdit, 
  setIsCreating 
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner min-h-[calc(100vh-80px-32px)]">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold" style={{ color: PRIMARY_COLOR }}>
          Atividades Cadastradas
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          style={{ backgroundColor: PRIMARY_COLOR }}
          className={`flex items-center space-x-2 px-6 py-3 font-bold text-white rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl whitespace-nowrap`}
          title="Adicionar Nova Atividade"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>Adicionar Nova</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activities.length > 0 ? (
          activities.map((activity: Activity) => ( 
            <ProfessorActivityCard 
              key={activity.id} 
              activity={activity} 
              onEdit={setActivityToEdit}
              onDelete={handleDeleteActivity}
            />
          ))
        ) : (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl shadow-md border-2 border-dashed border-gray-200">
            Nenhuma atividade cadastrada. Clique em "Adicionar Nova" para começar.
          </div>
        )}
      </div>
    </div>
  );
};


// 💻 Componente Principal da Aplicação
export default function PaginaAtividadesCompleta() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveActivity = useCallback((activity: Activity) => { 
    if (activityToEdit) {
      setActivities(prevActivities => 
        prevActivities.map(act => (act.id === activity.id ? activity : act))
      );
      setActivityToEdit(null); 
    } else {
      setActivities(prevActivities => [activity, ...prevActivities]); 
      setIsCreating(false); 
    }
  }, [activityToEdit]);
  
  const handleDeleteActivity = useCallback((id: string) => { 
    if (window.confirm('Confirma a exclusão desta atividade? Esta ação não pode ser desfeita.')) {
      setActivities(prevActivities => prevActivities.filter(act => act.id !== id));
    }
  }, []);

  const handleCloseModal = useCallback(() => { 
    setIsCreating(false); 
    setActivityToEdit(null); 
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 relative font-sans text-gray-900">
      
      {/* 🔝 Cabeçalho (Mantido) */}
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

      {/* ☰ Overlay (Mantido) */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          menuAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMenuAberto(false)}
      />

      {/* Sidebar (Corrigida: Atividades agora está ativo) */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 flex flex-col h-full">
          
          {/* Campo de Pesquisa e Botão de Fechar */}
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
          
          {/* Links de Navegação */}
          <nav className="space-y-4 flex-1">
            {/* CORRIGIDO: Este link agora é o ativo/selecionado */}
            <Link href="/professor/atividades" className="flex items-center gap-4 px-2 py-2 text-[#5B3A9A] bg-purple-50 rounded-md transition-colors group">
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Atividades</span>
            </Link>
            
            <Link href="/professor/muraldeavisos" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Mural de avisos</span>
            </Link>
            <Link href="/professor/horarios" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Horários</span>
            </Link>
            
            {/* CORRIGIDO: Este link agora é um link normal, sem o destaque de ativo */}
            <Link href="/professor/dashboard" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Turmas</span>
            </Link>
            
            <Link href="/professor/boletim" className="flex items-center gap-4 px-2 py-2 text-gray-700 hover:text-[#5B3A9A] transition-colors group">
              <FileText className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Boletim</span>
            </Link>
          </nav>

          {/* Rodapé da Sidebar (Sair e Contato) */}
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
      
      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfessorActivitiesPanel 
          activities={activities}
          handleDeleteActivity={handleDeleteActivity}
          setActivityToEdit={setActivityToEdit}
          setIsCreating={setIsCreating}
        />
      </main>

      {/* 📝 Modal (Criação/Edição) */}
      {(isCreating || activityToEdit) && (
        <ActivityFormModal 
          isNew={isCreating}
          activity={activityToEdit}
          onSave={handleSaveActivity} 
          onClose={handleCloseModal} 
        />
      )}

    </div>
  );
}