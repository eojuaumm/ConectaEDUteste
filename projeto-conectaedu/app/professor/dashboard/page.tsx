import { Metadata } from 'next';
import DashboardContent from './DashboardContent'; 

export const metadata: Metadata = {
  title: 'ConectaEDU - Painel do Professor',
  description: 'Selecione o ano escolar e a turma para gerenciar atividades e horários.',
};

export default function Page() {
  return <DashboardContent />;
}