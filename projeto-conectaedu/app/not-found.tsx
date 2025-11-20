

'use client'; // 1. Torna o componente interativo para usar o histórico

import { useRouter } from 'next/navigation'; // Importamos o hook de navegação

export default function NotFound() {
  const router = useRouter(); // Inicializamos o router

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-8xl font-bold text-indigo-600 sm:text-9xl">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Página Não Encontrada
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Oops! Parece que a página que você está procurando não existe mais ou foi movida.
      </p>
      
      {/* Botão com ação de voltar */}
      <button
        type="button"
        onClick={() => router.back()} // Ação mágica para voltar à página anterior
        className="mt-8 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Voltar para a Página Anterior
      </button>
    </main>
  )
}