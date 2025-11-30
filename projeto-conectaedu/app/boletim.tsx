'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Search, 
  ChevronDown, 
  User, 
  BookOpen, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Menu,
  School
} from 'lucide-react';

// --- MOCK DATA (Dados de Exemplo) ---
const ALUNOS_MOCK = [
  {
    id: 1,
    nome: "Ana Clara Souza",
    matricula: "2024001",
    turma: "9º Ano A",
    turno: "Matutino",

    // 🔄 FOTO TROCADA
    foto: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

    frequencia_global: 92,
    disciplinas: [
      { nome: "Matemática", notas: [8.5, 7.0, 9.0, 8.0], faltas: 2 },
      { nome: "Português", notas: [9.0, 9.5, 8.5, 9.0], faltas: 0 },
      { nome: "História", notas: [7.5, 8.0, 7.0, 7.5], faltas: 1 },
      { nome: "Geografia", notas: [6.5, 7.0, 6.0, 7.0], faltas: 3 },
      { nome: "Ciências", notas: [8.0, 8.5, 9.0, 8.5], faltas: 1 },
      { nome: "Inglês", notas: [9.5, 9.0, 10.0, 9.5], faltas: 0 },
      { nome: "Ed. Física", notas: [10.0, 10.0, 10.0, 10.0], faltas: 4 },
      { nome: "Artes", notas: [8.0, 8.0, 8.5, 9.0], faltas: 0 },
    ]
  },
  {
    id: 2,
    nome: "João Pedro Alves",
    matricula: "2024045",
    turma: "9º Ano A",
    turno: "Matutino",

    // 🔄 FOTO TROCADA
    foto: "https://i.pravatar.cc/150?u=a042581f4e29026024d",

    frequencia_global: 78,
    disciplinas: [
      { nome: "Matemática", notas: [5.0, 4.5, 6.0, 5.5], faltas: 8 },
      { nome: "Português", notas: [6.0, 6.5, 5.5, 6.0], faltas: 4 },
      { nome: "História", notas: [7.0, 7.5, 6.0, 7.0], faltas: 2 },
      { nome: "Geografia", notas: [5.5, 6.0, 5.0, 5.5], faltas: 5 },
      { nome: "Ciências", notas: [6.0, 5.5, 6.5, 6.0], faltas: 3 },
      { nome: "Inglês", notas: [4.0, 5.0, 4.5, 5.0], faltas: 2 },
      { nome: "Ed. Física", notas: [9.0, 9.5, 8.0, 9.0], faltas: 1 },
      { nome: "Artes", notas: [7.0, 6.5, 7.0, 7.5], faltas: 0 },
    ]
  }
];

export default function BoletimPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");

  const aluno = ALUNOS_MOCK.find(s => s.id === selectedStudentId) || ALUNOS_MOCK[0];

  // Helper: Calcular média
  const calcularMedia = (notas: number[]) => {
    const total = notas.reduce((acc, curr) => acc + curr, 0);
    return (total / notas.length).toFixed(1);
  };

  // Helper: Determinar status e cor
  const getStatus = (media: number) => {
    if (media >= 7) return { label: "Aprovado", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 };
    if (media >= 5) return { label: "Recuperação", color: "text-amber-600 bg-amber-50", icon: AlertCircle };
    return { label: "Reprovado", color: "text-rose-600 bg-rose-50", icon: XCircle };
  };

  // Helper: Cor da nota individual
  const getNotaColor = (nota: number) => {
    if (nota >= 7) return "text-emerald-600 font-medium";
    if (nota >= 5) return "text-amber-600 font-medium";
    return "text-rose-600 font-medium";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- HEADER SUPERIOR --- */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <School className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent hidden sm:block">
              Conecta Ed
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                className="bg-transparent border-none outline-none text-sm w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
              PF
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- CABEÇALHO DO BOLETIM (ALUNO SELETOR) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Boletim Escolar</h1>
            <p className="text-slate-500 mt-1">Acompanhamento de desempenho acadêmico - 2024</p>
          </div>
          
          <div className="flex gap-3">
             {/* Mock dropdown de alunos */}
            <div className="relative">
              <select 
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(Number(e.target.value))}
                className="appearance-none bg-white border border-slate-300 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium cursor-pointer"
              >
                {ALUNOS_MOCK.map(a => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* --- CARTÃO DE INFORMAÇÕES DO ALUNO --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img 
              src={aluno.foto} 
              alt={aluno.nome} 
              className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-sm"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{aluno.nome}</h2>
                <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm">
                  <User className="w-4 h-4" />
                  <span>Matrícula: {aluno.matricula}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-500">Turma:</span>
                  <span className="font-semibold text-slate-800">{aluno.turma}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-slate-500">Ano Letivo:</span>
                  <span className="font-semibold text-slate-800">2024</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Frequência Global</span>
                <div className="flex items-end gap-2">
                  <span className={`text-2xl font-bold ${aluno.frequencia_global < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {aluno.frequencia_global}%
                  </span>
                  <span className="text-xs text-slate-400 mb-1.5">presença total</span>
                </div>
                {/* Barra de progresso */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                  <div 
                    className={`h-1.5 rounded-full ${aluno.frequencia_global < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${aluno.frequencia_global}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABELA DE NOTAS --- */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700">Desempenho por Disciplina</h3>
            <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-white rounded border border-slate-200">
              Médias parciais atualizadas
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 w-1/4">Disciplina</th>
                  <th className="px-4 py-4 text-center">1º Bim</th>
                  <th className="px-4 py-4 text-center">2º Bim</th>
                  <th className="px-4 py-4 text-center">3º Bim</th>
                  <th className="px-4 py-4 text-center">4º Bim</th>
                  <th className="px-4 py-4 text-center">Faltas</th>
                  <th className="px-4 py-4 text-center bg-slate-100/50">Média Final</th>
                  <th className="px-6 py-4 text-center">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {aluno.disciplinas.map((materia, index) => {
                  const media = Number(calcularMedia(materia.notas));
                  const status = getStatus(media);
                  const StatusIcon = status.icon;

                  return (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {materia.nome}
                      </td>
                      {materia.notas.map((nota, i) => (
                        <td key={i} className={`px-4 py-4 text-center ${getNotaColor(nota)}`}>
                          {nota.toFixed(1)}
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center text-slate-600">
                        {materia.faltas}
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-slate-800 bg-slate-50/50">
                        {media.toFixed(1)}
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto ${status.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Rodapé da Tabela / Legenda */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap gap-4 justify-center md:justify-end">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span>Aprovado (≥ 7.0)</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-amber-500"></div>
               <span>Recuperação (≥ 5.0 e &lt; 7.0)</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-rose-500"></div>
               <span>Reprovado (&lt; 5.0)</span>
             </div>
          </div>
        </div>

        {/* --- ÁREA DE OBSERVAÇÕES --- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                Observações do Conselho de Classe
              </h3>
              <div className="p-4 bg-blue-50 text-blue-900 text-sm rounded-lg leading-relaxed">
                <p>
                  O aluno demonstra excelente participação nas aulas de exatas. Recomenda-se maior atenção
                  às entregas de trabalhos de Geografia. Parabéns pelo desempenho geral no bimestre.
                </p>
                <div className="mt-4 font-semibold text-blue-800 text-xs">
                  Data: 26/11/2024 - Profa. Juliana (Coordenação)
                </div>
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Printer className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-800">Precisa do documento assinado?</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">
                Você pode solicitar a via oficial impressa e assinada na secretaria escolar.
              </p>
              <button className="mt-4 text-blue-600 font-medium text-sm hover:underline">
                Solicitar via na secretaria
              </button>
           </div>
        </div>

      </main>
    </div>
  );
}
