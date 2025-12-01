'use client'; 

import React, { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';   


const PRIMARY_COLOR = '#5B3A9A';        
const COLOR_MURAL_BACKGROUND = '#5C3A98'; 
const COLOR_CARD_BACKGROUND = '#66C2E6';   
const COLOR_WAVE_BACKGROUND = '#4A2E70';   
const COLOR_BOTTOM_BORDER = '#49B5E7';   


const navItems = [
    { title: 'Atividades', href: '#', iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", active: true },
    { title: 'Mural de avisos', href: '#', iconPath: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
    { title: 'Horários', href: '#', iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: 'Turmas', href: '/professor/dashboard', iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, 
    { title: 'Boletim', href: '#', iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
];


interface Activity {
  id: string;
  title: string;
  subject: string; 
  description: string;
  date: string; 
}

const initialActivities: Activity[] = [
  { id: 'a1', title: 'Atividade 1', subject: 'Matéria 1', description: 'Redação sobre o uso da Inteligência Artificial no mercado de trabalho.', date: '10/12/2025' },
  { id: 'a2', title: 'Atividade 2', subject: 'Matéria 2', description: 'Resolver os exercícios 1 a 10 da página 45 do livro didático.', date: '15/12/2025' },
  { id: 'a3', title: 'Atividade 3', subject: 'Matéria 3', description: 'Preparar slides para a apresentação sobre o Sistema Solar. Grupo 3.', date: '20/12/2025' },
];


const ActivityFormModal: React.FC<any> = ({ activity, onSave, onClose, isNew }) => {
    const [formData, setFormData] = useState<Omit<Activity, 'id'>>(
        activity ? { ...activity } : { title: '', subject: '', description: '', date: new Date().toLocaleDateString('pt-BR') }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const activityToSave: Activity = { ...formData, id: activity?.id || Date.now().toString() };
        onSave(activityToSave);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 border-b pb-2">
                    {isNew ? 'ADICIONAR NOVA ATIVIDADE' : 'EDITAR ATIVIDADE'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Matéria</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500" required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data de Entrega</label>
                        <input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full mt-1 border border-gray-300 rounded-lg p-3 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div className="flex justify-end pt-4 space-x-3">
                        <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition">Cancelar</button>
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">{isNew ? 'Adicionar' : 'Salvar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ActivityCard: React.FC<{ activity: Activity, onEdit: (act: Activity) => void, onDelete: (id: string) => void }> = ({ activity, onEdit, onDelete }) => {
    return (
      <div 
        key={activity.id} 
        style={{ backgroundColor: COLOR_CARD_BACKGROUND }}
        className={`p-4 rounded-[2rem] shadow-xl flex flex-col justify-between h-56 transition transform hover:scale-[1.02]`}
      >
        <div className='flex flex-col h-full'>
        
            <div className="flex justify-between items-start text-white mb-1">
                <h4 className="text-xl font-bold truncate">
                    {activity.title}
                </h4>
                <span className="text-sm font-light whitespace-nowrap pt-1 opacity-90">
                    Para: ({activity.date})
                </span>
            </div>
            
          
            <span className="text-sm font-light text-white/90">
                {activity.subject}
            </span>

            <div className="flex-grow mt-2"></div>
        </div>
        
        
        <div className="mt-auto flex justify-end items-center text-white/90 pt-2 text-sm">
            <span className="mr-4 text-xs font-light tracking-wider opacity-90">Editor</span>
            
           
            <div className='flex space-x-2'>
                <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(activity); }}
                    className="p-1 rounded-full hover:bg-white/30 transition"
                    title="Editar Atividade"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-4l7 7m-7-7v7M16 5l-7 7m7-7l4 4M14 8l1 1"/></svg>
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                    className="p-1 rounded-full hover:bg-red-500/50 transition"
                    title="Excluir Atividade"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12H6L5 7m5 0V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8"/></svg>
                </button>
            </div>
        </div>
      </div>
    );
  };

const MuralDeAtividades: React.FC<any> = ({ 
    activities, 
    handleDeleteActivity, 
    setActivityToEdit, 
    setIsCreating 
}) => {
    return (
        <div className={`h-[calc(100vh-80px)] pt-2 border-b-[8px] rounded-b-xl`} style={{ borderColor: COLOR_BOTTOM_BORDER }}>
            
            <div className={`w-full h-full p-6 pb-20 rounded-t-xl relative overflow-hidden`} style={{ backgroundColor: COLOR_MURAL_BACKGROUND }}>
                
                <div className="absolute inset-0 z-0">
                    <div 
                        style={{ 
                            backgroundColor: COLOR_WAVE_BACKGROUND,
                            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 75% 100%, 0 90%)',
                        }} 
                        className="absolute inset-0 opacity-40 transform scale-[1.3] -translate-x-1/4"
                    ></div>
                </div>

            
                <div className="relative z-10 h-full flex flex-col"> 
                    
                    <div className="flex justify-between items-center mb-10">
                        
                    
                        <div className='flex-grow text-center'>
                            <h2 className="text-4xl font-extrabold text-white tracking-wider inline-block"> 
                                TURMA 1 - ATIVIDADES
                            </h2>
                        </div>
                        
                       
                        <button
                            onClick={() => setIsCreating(true)}
                            style={{ color: COLOR_MURAL_BACKGROUND, backgroundColor: COLOR_CARD_BACKGROUND }}
                            className={`flex items-center space-x-2 px-6 py-2 font-bold rounded-full shadow-lg transition transform hover:scale-105 hover:shadow-xl text-white whitespace-nowrap`}
                            title="Adicionar Nova Atividade"
                        >
                            ADICIONAR
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-y-auto pr-2">
                    {activities.length > 0 ? (
                        activities.map((activity: Activity) => ( 
                        <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        onEdit={setActivityToEdit}
                        onDelete={handleDeleteActivity}
                        />
                        ))
                    ) : (
                        <div className="col-span-full p-8 text-center text-white/80 bg-white/10 rounded-xl shadow-inner">
                        Nenhuma atividade cadastrada.
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavLink: React.FC<any> = ({ title, href, iconPath, active, setMenuAberto }) => (
    <Link 
        href={href} 
        className={`flex items-center gap-4 px-2 py-2 rounded-md transition-colors group ${
            active ? `text-[${PRIMARY_COLOR}] bg-purple-50` : 'text-gray-700 hover:text-[#5B3A9A] hover:bg-gray-50'
        }`}
        onClick={() => setMenuAberto(false)}
    >
        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
        <span className="font-medium">{title}</span>
    </Link>
);


export default function PaginaAtividadesCompleta() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSaveActivity = (activity: Activity) => { 
        if (activityToEdit) {
            
            setActivities(prevActivities => 
                prevActivities.map(act => (act.id === activity.id ? activity : act))
            );
            setActivityToEdit(null); 
        } else {
    
            setActivities(prevActivities => [activity, ...prevActivities]); 
            setIsCreating(false); 
        }
    };
    
    const handleDeleteActivity = (id: string) => { 
        if (window.confirm('Confirma a exclusão desta atividade?')) {
            setActivities(prevActivities => prevActivities.filter(act => act.id !== id));
        }
    };
    const handleCloseModal = () => { setIsCreating(false); setActivityToEdit(null); };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMenuAberto(true)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors" aria-label="Abrir menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <div className="flex items-center gap-2">
                            <Image src="/images/logoconectaedureso.png" alt="Logo ConectaEDU" width={32} height={32} className="rounded-full"/>
                            <span className="text-xl font-bold hidden sm:block" style={{ color: PRIMARY_COLOR }}>ConectaEDU</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">Professor(a)</p>
                            <p className="text-xs text-gray-500">Logado</p>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-[#5B3A9A] hover:ring-2 hover:ring-[#5B3A9A] transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${menuAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuAberto(false)}/>
            <aside 
                className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-6 flex flex-col h-full"> 
                    <div className="flex items-center gap-3 mb-8">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#5B3A9A] focus:border-[#5B3A9A] sm:text-sm"
                                placeholder="Pesquisar..."
                            />
                        </div>
                        <button onClick={() => setMenuAberto(false)} className="p-2 text-gray-600 hover:text-[#5B3A9A] transition-colors" aria-label="Fechar menu">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" className="transform rotate-180"/></svg> 
                        </button>
                    </div>
                    <hr className="border-gray-200 mb-6" />
                    <nav className="space-y-4 flex-1">
                        {navItems.map(item => (<NavLink key={item.title} {...item} setMenuAberto={setMenuAberto} />))}
                    </nav>
                    <div className="mt-auto space-y-4">
                        <Link href="/" className="flex items-center gap-4 px-2 py-2 text-gray-800 hover:text-red-600 transition-colors font-bold uppercase tracking-wide">
                            <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            SAIR
                        </Link>
                    </div>
                </div>
            </aside>
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <MuralDeAtividades 
                    activities={activities}
                    handleDeleteActivity={handleDeleteActivity}
                    setActivityToEdit={setActivityToEdit}
                    setIsCreating={setIsCreating}
                />
            </main>

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