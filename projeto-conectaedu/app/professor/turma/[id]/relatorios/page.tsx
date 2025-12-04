'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  FileText, 
  Download, 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Calendar,
  ArrowDown,
  Filter
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
  return twMerge(clsx(inputs));
}

const dadosGerais = {
  mediaTurma: 7.8,
  frequenciaMedia: 92,
  totalAlunos: 32,
  alunosRisco: 3
};

const desempenhoPorMateria = [
  { materia: "Matemática", media: 6.5, cor: "bg-red-400" },
  { materia: "Português", media: 8.2, cor: "bg-green-400" },
  { materia: "História", media: 7.9, cor: "bg-blue-400" },
  { materia: "Ciências", media: 7.5, cor: "bg-purple-400" },
  { materia: "Geografia", media: 8.8, cor: "bg-teal-400" },
];

const alunosDestaque = [
  { id: 1, nome: "Ana Clara Souza", media: 9.8, frequencia: 100, status: "Excelente" },
  { id: 2, nome: "Pedro Henrique", media: 9.5, frequencia: 98, status: "Excelente" },
  { id: 3, nome: "Mariana Lima", media: 9.2, frequencia: 95, status: "Muito Bom" },
];

const alunosAtencao = [
  { id: 4, nome: "João Silva", media: 4.5, frequencia: 70, motivo: "Baixas notas" },
  { id: 5, nome: "Carlos Eduardo", media: 6.0, frequencia: 65, motivo: "Faltas excessivas" },
];

const alunosexemplo = [
  { id: 1, nome: "Linaldo Vinicius", media: 7.5, frequencia: 90, situacao: "Aprovado" },
  { id: 2, nome: "João Victor", media: 6.8, frequencia: 85, situacao: "Reprovado" },
  { id: 3, nome: "Cauan", media: 8.2, frequencia: 95, situacao: "Aprovado" },
  { id: 4, nome: "Maria Clara", media: 5.9, frequencia: 80, situacao: "Reprovado" },
  { id: 5, nome: "Isabele", media: 9.1, frequencia: 98, situacao: "Aprovado" },
  { id: 6, nome: "Gustavo", media: 4.3, frequencia: 60, situacao: "Reprovado" },
];

export default function RelatoriosPage() {
  const router = useRouter();
  const params = useParams();
  const [periodoSelecionado, setPeriodoSelecionado] = useState('1º Bimestre');

  const handleExportar = (tipo: string) => {
    alert(`Iniciando download do relatório em ${tipo}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
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
                    <BarChart3 className="w-6 h-6 text-[#5B3A9A]" />
                    Relatórios da Turma
                </h1>
           </div>
           
           <div className="flex gap-2">
             <button 
                onClick={() => handleExportar('PDF')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
             >
                <FileText className="w-4 h-4" />
                PDF
             </button>
             <button 
                onClick={() => handleExportar('Excel')}
                className="flex items-center gap-2 px-3 py-2 bg-[#5B3A9A] text-white rounded-lg text-sm font-medium hover:bg-[#4a2e80] transition-colors shadow-sm"
             >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar Excel</span>
             </button>
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex justify-end mb-6">
            <div className="relative inline-block">
                <select 
                    value={periodoSelecionado}
                    onChange={(e) => setPeriodoSelecionado(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 hover:border-[#5B3A9A] text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5B3A9A] focus:border-transparent font-medium cursor-pointer"
                >
                    <option>1º Bimestre</option>
                    <option>2º Bimestre</option>
                    <option>3º Bimestre</option>
                    <option>4º Bimestre</option>
                    <option>Anual Completo</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <span className="text-gray-500 text-sm font-medium">Média Geral</span>
                    <div className="p-2 bg-purple-50 rounded-lg text-[#5B3A9A]">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-900">{dadosGerais.mediaTurma}</h3>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                        <span className="bg-green-100 px-1 rounded mr-1">↑ 0.2</span> vs. bimestre anterior
                    </p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <span className="text-gray-500 text-sm font-medium">Frequência Média</span>
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-900">{dadosGerais.frequenciaMedia}%</h3>
                    <p className="text-xs text-gray-500 mt-1">Meta escolar: 85%</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                    <span className="text-gray-500 text-sm font-medium">Total de Alunos</span>
                    <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-900">{dadosGerais.totalAlunos}</h3>
                    <p className="text-xs text-gray-500 mt-1">3 Transferidos</p>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100 flex flex-col justify-between h-32 ring-1 ring-red-50">
                <div className="flex justify-between items-start">
                    <span className="text-red-600 text-sm font-medium">Alunos em Risco</span>
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-red-600">{dadosGerais.alunosRisco}</h3>
                    <p className="text-xs text-red-400 mt-1">Requer atenção imediata</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h2 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gray-400" />
                    Desempenho por Matéria (Média)
                </h2>
                
                <div className="space-y-4">
                    {desempenhoPorMateria.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between mb-1 text-sm">
                                <span className="font-medium text-gray-700">{item.materia}</span>
                                <span className="font-bold text-gray-900">{item.media}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div 
                                    className={cn("h-3 rounded-full transition-all duration-1000 ease-out", item.cor)} 
                                    style={{ width: `${item.media * 10}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                     <p className="text-xs text-gray-500">Dados atualizados em 04/12/2025</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
                    <h2 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Atenção Necessária
                    </h2>
                    <div className="space-y-3">
                        {alunosAtencao.map((aluno) => (
                            <div key={aluno.id} className="bg-red-50 p-3 rounded-lg border border-red-100">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold text-gray-800 text-sm">{aluno.nome}</span>
                                    <span className="text-xs font-bold text-red-600 bg-white px-2 py-0.5 rounded border border-red-100">
                                        Média: {aluno.media}
                                    </span>
                                </div>
                                <p className="text-xs text-red-500">{aluno.motivo}</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
                        Ver todos os alertas
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Top Desempenho
                    </h2>
                    <ul className="divide-y divide-gray-100">
                        {alunosDestaque.map((aluno, idx) => (
                            <li key={aluno.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">{aluno.nome}</span>
                                </div>
                                <span className="text-sm font-bold text-green-600">{aluno.media}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-gray-800">Listagem Completa</h2>
                <button className="text-sm text-[#5B3A9A] font-medium hover:underline flex items-center gap-1">
                    Ver tudo <ArrowDown className="w-3 h-3" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Nome do Aluno</th>
                            <th className="px-6 py-3">Frequência</th>
                            <th className="px-6 py-3">Média Geral</th>
                            <th className="px-6 py-3">Situação</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                     {alunosexemplo.map((aluno) => (
                        <tr key={aluno.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 font-medium text-gray-900">
                         {aluno.nome}
                        </td>            
                         <td className="px-6 py-4 text-gray-600">
                         {aluno.frequencia}%
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800">
                         {aluno.media}
                       </td>
                        <td className="px-6 py-4">
                     <span className={cn(
                     "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      aluno.situacao === "Aprovado" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                        )}>
                        {aluno.situacao}
                       </span>
                       </td>
                      <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-[#5B3A9A] font-medium transition-colors">
                    Detalhes
                </button>
            </td>
        </tr>
    ))}
</tbody>
                </table>
            </div>
        </div>

      </main>
    </div>
  );
}