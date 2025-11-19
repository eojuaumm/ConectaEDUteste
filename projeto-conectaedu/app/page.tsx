<<<<<<< HEAD
// app/escolhafuncao/page.tsx
=======
import Image from 'next/image';
import { Metadata } from 'next';  

export const metadata: Metadata = {
  title: 'Login - ConectaEDU',
  description: 'Página de login para o ConectaEDU',
};
>>>>>>> 374d158 (not-found tela)

import RoleSelectionCard from './components/RoleSelectionCard';

export default function PaginaSelecaoFuncao() {
  return (
<<<<<<< HEAD
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
=======
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logoconectaedureso.png"
            alt="Logo ConectaEDU"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <form className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Sua senha"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>
          <div className="flex flex-col items-center space-y-1 pt-4 text-xs text-gray-600">
            <a href="#" className="hover:underline">
              Esqueci minha senha
            </a>
            <a href="#" className="hover:underline">
              Não possuo cadastro
            </a>
          </div>

        </form>
>>>>>>> 374d158 (not-found tela)
      </div>

      {/* Card de Seleção de Função (acima do fundo simulado) */}
      <div className="z-10">
        <RoleSelectionCard />
      </div>

    </main>
  );
}