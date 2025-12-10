'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  ChevronLeft, 
  Save,
  User,
  Layers,
  FileText
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

type BimestreKey = '1º Bim' | '2º Bim' | '3º Bim' | '4º Bim';

interface NotaDisciplina {
  id: number;
  nome: string;
  bimestres: Record<BimestreKey, number | null>;
  faltas: number;
  situacao: 'Cursando' | 'Aprovado' | 'Reprovado';
}

interface AlunoBoletim {
    id: number;
    nome: string;
    matricula: string;
    disciplinas: NotaDisciplina[];
}

const criarDisciplinasPadrao = (notas: Record<string, [number | null, number | null, number | null, number | null]>, faltas: Record<string, number>): NotaDisciplina[] => {
    return [
        "Matemática", "Português", "História", "Geografia", 
        "Ciências", "Inglês", "Educação Física"
    ].map((nome, index) => ({
        id: index + 1,
        nome: nome,
        bimestres: {
            '1º Bim': notas[nome]?.[0] ?? null,
            '2º Bim': notas[nome]?.[1] ?? null,
            '3º Bim': notas[nome]?.[2] ?? null,
            '4º Bim': notas[nome]?.[3] ?? null,
        },
        faltas: faltas[nome] ?? 0,
        situacao: 'Cursando',
    }));
};

const notasAluno1: Record<string, [number | null, number | null, number | null, number | null]> = {
    "Matemática": [8.5, 7.0, null, null],
    "Português": [9.0, 8.5, null, null],
    "História": [6.5, 7.5, null, null],
    "Geografia": [8.0, 8.0, null, null],
    "Ciências": [7.0, 6.0, null, null],
    "Inglês": [9.5, 9.0, null, null],
    "Educação Física": [10.0, 10.0, null, null],
};
const faltasAluno1 = { "Matemática": 2, "Português": 0, "História": 1, "Geografia": 0, "Ciências": 4, "Inglês": 0, "Educação Física": 0 };

const mockTurmaBoletim: AlunoBoletim[] = [
    { 
        id: 1, 
        nome: "João Silva", 
        matricula: "20240123", 
        disciplinas: criarDisciplinasPadrao(notasAluno1, faltasAluno1) 
    },
    { 
        id: 2, 
        nome: "Maria Oliveira", 
        matricula: "20240124", 
        disciplinas: criarDisciplinasPadrao({
            "Matemática": [7.5, 8.0, null, null],
            "Português": [6.0, 7.5, null, null],
        }, { "Matemática": 1, "Português": 3 }) 
    },
];

const ProfessorGestaoNotasScreen = () => {
    const router = useRouter();
    const [turma, setTurma] = useState(mockTurmaBoletim);
    const [alunoSelecionadoId, setAlunoSelecionadoId] = useState(turma[0].id);
    const [anoLetivo, setAnoLetivo] = useState('2024');

    const alunoAtual = useMemo(() => {
        return turma.find(aluno => aluno.id === alunoSelecionadoId);
    }, [turma, alunoSelecionadoId]);

    const calcularMedia = (bimestres: NotaDisciplina['bimestres']): number | null => {
        const notas = Object.values(bimestres).filter(nota => typeof nota === 'number') as number[];
        if (notas.length === 0) return null;
        const soma = notas.reduce((acc, nota) => acc + nota, 0);
        const media = soma / notas.length;
        return parseFloat(media.toFixed(1));
    };

    const handleAtualizarNota = (disciplinaId: number, bimestre: BimestreKey, valor: string) => {
        setTurma(prevTurma => prevTurma.map(aluno => {
            if (aluno.id === alunoSelecionadoId) {
                return {
                    ...aluno,
                    disciplinas: aluno.disciplinas.map(disciplina => {
                        if (disciplina.id === disciplinaId) {
                            let notaNumerica: number | null = null;
                            const valorTratado = valor.replace(',', '.').trim();

                            if (valorTratado !== '') {
                                const parsed = parseFloat(valorTratado);
                                if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) { 
                                    notaNumerica = parsed;
                                } else {
                                    console.warn(`Tentativa de inserir nota inválida: ${valor}`);
                                    return disciplina; 
                                }
                            }
                            
                            return {
                                ...disciplina,
                                bimestres: {
                                    ...disciplina.bimestres,
                                    [bimestre]: notaNumerica,
                                }
                            };
                        }
                        return disciplina;
                    })
                };
            }
            return aluno;
        }));
    };


    const renderNota = (nota: number | null, isMedia: boolean = false) => {
        if (nota === null) {
            return <span className="text-gray-400 font-medium">-</span>;
        }
        
        let cor;
        if (nota >= 7.0) {
            cor = isMedia ? 'text-blue-600 font-extrabold' : 'text-gray-900 font-medium';
        } else if (nota >= 5.0) {
            cor = 'text-yellow-600 font-bold';
        } else {
            cor = 'text-red-600 font-bold';
        }

        return <span className={cn(cor)}>{nota.toFixed(1).replace('.', ',')}</span>;
    };
    
    const renderSituacao = (situacao: NotaDisciplina['situacao']) => {
        let cor;
        if (situacao === 'Aprovado') cor = 'bg-green-100 text-green-700 border-green-200';
        else if (situacao === 'Reprovado') cor = 'bg-red-100 text-red-700 border-red-200';
        else cor = 'bg-blue-100 text-blue-700 border-blue-200';

        return (
            <span className={cn(
                "inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border",
                cor
            )}>
                {situacao}
            </span>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
            
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.back()} 
                            className="p-2 -ml-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-[#5B3A9A]" />
                            Lançamento de Notas
                        </h1>
                    </div>
                    
                    <div className='flex items-center gap-2'>
                        <button 
                            onClick={() => alert("Exportar para PDF/CSV implementado!")}
                            className="text-[#5B3A9A] bg-white border border-[#5B3A9A] hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                            Baixar Relatório
                        </button>
                        <button 
                            onClick={() => alert("Salvar todas as alterações implementado!")}
                            className="bg-[#5B3A9A] hover:bg-[#4a2e80] text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors shadow-sm"
                        >
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Lançamento de Notas</h2>
                    <p className="text-gray-500">Edite as notas do boletim para o aluno {alunoAtual?.nome || 'N/A'}.</p>
                </div>

                <div className='flex justify-between items-center mb-6'>
                    <div className="w-64">
                        <select
                            value={alunoSelecionadoId}
                            onChange={(e) => setAlunoSelecionadoId(parseInt(e.target.value))}
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-[#5B3A9A] focus:border-[#5B3A9A] bg-white text-sm shadow-sm"
                        >
                            {turma.map(aluno => (
                                <option key={aluno.id} value={aluno.id}>
                                    {aluno.nome} - {aluno.matricula}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-600'>Ano Letivo:</span>
                        <select
                            value={anoLetivo}
                            onChange={(e) => setAnoLetivo(e.target.value)}
                            className="py-1.5 px-3 border border-gray-300 rounded-lg focus:ring-[#5B3A9A] focus:border-[#5B3A9A] bg-white text-sm"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#5B3A9A] text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                        <div>
                            <p className="text-sm font-light flex items-center gap-2"><User className='w-4 h-4'/> Aluno</p>
                            <h3 className="text-2xl font-extrabold mt-1">{alunoAtual?.nome || 'N/A'}</h3>
                            <p className="text-sm opacity-80 mt-1">Matrícula: {alunoAtual?.matricula || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md flex flex-col justify-between">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><Layers className='w-4 h-4 text-[#5B3A9A]'/> Turma</p>
                        <h3 className="text-2xl font-extrabold text-gray-800 mt-1">9º Ano A</h3>
                    </div>

                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md flex flex-col justify-between">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-2"><BookOpen className='w-4 h-4 text-[#5B3A9A]'/> Total de Matérias</p>
                        <h3 className="text-2xl font-extrabold text-gray-800 mt-1">{alunoAtual?.disciplinas.length || 0} Disciplinas</h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl overflow-x-auto border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Disciplina
                                </th>
                                {['1º Bim', '2º Bim', '3º Bim', '4º Bim'].map((bim) => (
                                    <th key={bim} className="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        {bim}
                                    </th>
                                ))}
                                <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Média
                                </th>
                                <th className="px-3 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Faltas
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Situação
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alunoAtual?.disciplinas.map((disciplina) => (
                                <tr key={disciplina.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                        {disciplina.nome}
                                    </td>
                                    {Object.keys(disciplina.bimestres).map(key => {
                                        const bimestreKey = key as BimestreKey;
                                        const notaAtual = disciplina.bimestres[bimestreKey];
                                        
                                        const displayValue = notaAtual !== null ? notaAtual.toFixed(1).replace('.', ',') : '';

                                        return (
                                            <td key={bimestreKey} className="px-3 py-2 whitespace-nowrap text-center text-sm">
                                                <input
                                                    type="text"
                                                    value={displayValue}
                                                    onChange={(e) => handleAtualizarNota(disciplina.id, bimestreKey, e.target.value)}
                                                    onBlur={(e) => handleAtualizarNota(disciplina.id, bimestreKey, e.target.value)}
                                                    className={cn(
                                                        "w-16 py-1 px-1 border rounded-md text-center font-bold transition-all",
                                                        "focus:outline-none focus:ring-2 focus:ring-[#5B3A9A]",
                                                        notaAtual !== null ? 'border-gray-300 text-gray-800' : 'border-red-300 text-red-600 bg-red-50'
                                                    )}
                                                    placeholder="-"
                                                    maxLength={4}
                                                />
                                            </td>
                                        )
                                    })}
                                    
                                    <td className="px-3 py-4 whitespace-nowrap text-center text-sm font-bold">
                                        {renderNota(calcularMedia(disciplina.bimestres), true)}
                                    </td>
                                    
                                    <td className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700 font-medium">
                                        {disciplina.faltas}
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {renderSituacao(disciplina.situacao)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

export default ProfessorGestaoNotasScreen;