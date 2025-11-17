// app/escolhafuncao/page.tsx

import RoleSelectionCard from './components/RoleSelectionCard';

export default function PaginaSelecaoFuncao() {
  return (
    // Fundo azul e layout flex para centralizar
    <main className="flex min-h-screen items-center justify-center bg-blue-500 relative overflow-hidden">
      
      {/*
        Simulação do padrão de fundo ondulado abstrato (fundo azul claro na imagem)
        O `bg-blue-500` foi usado para o fundo principal, e variações com opacidade 
        (blue-700/30, blue-600/20) para simular as ondas. 
        Ajuste as cores se você tiver uma cor específica no tailwind.config.js (ex: 'conecta-blue-bg').
      */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Onda 1 (Superior esquerda) */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-700/30 rounded-full blur-3xl transform rotate-45 scale-150"></div>
        {/* Onda 2 (Central direita) */}
        <div className="absolute top-1/2 right-0 w-2/3 h-2/3 bg-blue-600/20 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 rotate-12 scale-150"></div>
        {/* Onda 3 (Inferior esquerda) */}
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-blue-700/40 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2 -rotate-24 scale-150"></div>
      </div>

      {/* Card de Seleção de Função (acima do fundo simulado) */}
      <div className="z-10">
        <RoleSelectionCard />
      </div>

    </main>
  );
}