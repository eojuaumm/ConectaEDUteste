'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PRIMARY_COLOR = '#5B3A9A';        
const COLOR_MURAL_BACKGROUND = '#5C3A98'; 
const COLOR_CARD_BACKGROUND = '#40C0B4';
const COLOR_WAVE_BACKGROUND = '#4A2E70';  
const COLOR_BOTTOM_BORDER = '#49B5E7';  

const navItemsAluno = [
    // Atividades agora é a tela principal
    { title: 'Atividades', href: '/responsavel/atividades', iconPath: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z", active: true },
    { title: 'Mural de avisos', href: '/responsavel/muraldeavisos', iconPath: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
    { title: 'Horários', href: '/responsavel/horarios', iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: 'Boletim', href: '/responsavel/boletim', iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
];

interface ActivityAluno {
    id: string;
    title: string;
    subject: string;
    description: string;
    date: string;
    isSubmitted: boolean;
    submissionFileName: string | null;
}

const initialActivitiesAluno: ActivityAluno[] = [
    { id: 'a1', title: 'Atividade 1', subject: 'Matéria 1', description: 'Redação sobre IA...', date: '10/12/2025', isSubmitted: false, submissionFileName: null },
    { id: 'a2', title: 'Atividade 2', subject: 'Matéria 2', description: 'Resolver os exercícios...', date: '15/12/2025', isSubmitted: false, submissionFileName: null },
    { id: 'a3', title: 'Atividade 3', subject: 'Matéria 3', description: 'Preparar slides...', date: '20/12/2025', isSubmitted: true, submissionFileName: 'slides_grupo3.pptx' },
    { id: 'a4', title: 'Atividade 4', subject: 'Matéria 4', description: 'Pesquisa sobre o Ciclo da Água.', date: '01/12/2025', isSubmitted: false, submissionFileName: null },
];

const ActivityCardAluno: React.FC<{ activity: ActivityAluno, onSubmission: (id: string, fileName: string) => void }> = ({ activity, onSubmission }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (file) {
            onSubmission(activity.id, file.name);
            setFile(null);
        } else {
            alert('Selecione um arquivo para enviar.');
        }
    };
    
    const isSubmitted = activity.isSubmitted;
    const currentCardColor = isSubmitted ? '#16a34a' : COLOR_CARD_BACKGROUND; // Verde mais escuro se entregue
    const buttonBgColor = isSubmitted ? 'bg-gray-500' : `bg-[${PRIMARY_COLOR}] hover:bg-[${COLOR_WAVE_BACKGROUND}]`;
    const buttonText = isSubmitted ? '✅ ENTREGUE' : 'ANEXAR E ENVIAR';
    const fileNameDisplay = activity.submissionFileName || file?.name;
    
    return (
        <div 
            key={activity.id} 
            style={{ backgroundColor: currentCardColor }}
            className={`p-4 rounded-[2rem] shadow-xl flex flex-col justify-between h-64 transition transform hover:scale-[1.02]`}
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
                <p className="text-xs text-white/70 mt-2 line-clamp-2">{activity.description}</p>
                
                <div className="flex-grow mt-2"></div>
            </div>
            
            <div className="mt-auto flex flex-col pt-3 border-t border-white/30 text-white/90 text-sm">
                
                {isSubmitted ? (
                    <>
                        <span className="text-sm font-bold mb-1">Entregue com Sucesso!</span>
                        <p className="text-xs truncate opacity-80">Arquivo: {fileNameDisplay}</p>
                    </>
                ) : (
                    <>
                        <label className="block text-xs font-medium mb-2">Anexar Trabalho:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-xs text-white/90
                              file:mr-4 file:py-1 file:px-2
                              file:rounded-full file:border-0
                              file:text-xs file:font-semibold
                              file:bg-white/80 file:text-[${PRIMARY_COLOR}]
                              hover:file:bg-white transition-colors cursor-pointer"
                            title="Selecione seu arquivo"
                        />
                        {file && <p className="text-xs text-white/70 mt-1 truncate">Selecionado: {file.name}</p>}
                    </>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitted || !file}
                    className={`mt-3 w-full text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors ${buttonBgColor} disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

const MuralDeAtividadesAluno: React.FC<any> = ({ activities, handleSubmission }) => {
    return (
        <div className={`h-[calc(100vh-80px)] pt-2 border-b-[8px] rounded-b-xl`} style={{ borderColor: COLOR_BOTTOM_BORDER }}>

            <div className={`w-full h-full p-6 pb-20 rounded-t-xl relative overflow-hidden`} style={{ backgroundColor: COLOR_MURAL_BACKGROUND }}>
                
                <div className="absolute inset-0 z-0">
                    <div 
                        style={{ 
                            backgroundColor: COLOR_WAVE_BACKGROUND,
                            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 75% 100%, 0 95%)',
                        }} 
                        className="absolute inset-0 opacity-40 transform scale-[1.3] -translate-x-1/4"
                    ></div>
                </div>

                <div className="relative z-10 h-full flex flex-col">
                    
                    <div className="flex justify-center items-center mb-10">
                        <h2 className="text-4xl font-extrabold text-white tracking-wider uppercase">
                            TURMA 1 - ATIVIDADES
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-y-auto pr-2">
                        {activities.length > 0 ? (
                            activities.map((activity: ActivityAluno) => (
                                <ActivityCardAluno 
                                    key={activity.id} 
                                    activity={activity} 
                                    onSubmission={handleSubmission}
                                />
                            ))
                        ) : (
                            <div className="col-span-full p-8 text-center text-white/80 bg-white/10 rounded-xl shadow-inner">
                            🎉 Nenhuma atividade pendente.
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

export default function PaginaAtividadesAluno() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [activities, setActivities] = useState<ActivityAluno[]>(initialActivitiesAluno);

    const handleSubmission = (id: string, fileName: string) => {
        setActivities(prevActivities =>
            prevActivities.map(activity =>
                activity.id === id
                    ? { ...activity, isSubmitted: true, submissionFileName: fileName }
                    : activity
            )
        );
        alert(`🎉 Arquivo "${fileName}" enviado com sucesso!`);
    };
    
    const handleCloseMenu = () => setMenuAberto(false);

    return (
        <div className="min-h-screen bg-gray-50 relative">
            
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMenuAberto(true)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors" aria-label="Abrir menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold hidden sm:block" style={{ color: PRIMARY_COLOR }}>ConectaEDU</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">Aluno(a)</p>
                            <p className="text-xs text-gray-500">Logado</p>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-[#5B3A9A] hover:ring-2 hover:ring-[#5B3A9A] transition-all">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${menuAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={handleCloseMenu}/>
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
                        <button onClick={handleCloseMenu} className="p-2 text-gray-600 hover:text-[#5B3A9A] transition-colors" aria-label="Fechar menu">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" className="transform rotate-180"/></svg> 
                        </button>
                    </div>
                    <hr className="border-gray-200 mb-6" />
                    <nav className="space-y-4 flex-1">
                        {navItemsAluno.map(item => (<NavLink key={item.title} {...item} setMenuAberto={setMenuAberto} />))}
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
                <MuralDeAtividadesAluno 
                    activities={activities}
                    handleSubmission={handleSubmission}
                />
            </main>

        </div>
    );
}