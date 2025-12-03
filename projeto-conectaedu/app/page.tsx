import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ConectaEDU',
  description: 'Selecione sua função para continuar',
};

export default function PaginaSelecaoFuncao() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        
        <div className="mb-8 flex flex-col items-center">
          <div className="relative h-24 w-24 mb-4">
             <Image
                src="/images/logoconectaedureso.png"
                alt="Logo ConectaEDU"
                fill
                className="rounded-full object-cover"
                priority
              />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900">
            ConectaEDU
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Qual é a sua função?
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/professor/login" className="block w-full">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Professor
            </button>
          </Link>

          <Link href="/responsavel/login" className="block w-full">
             <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Pai ou responsável
            </button>
          </Link>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-gray-400">OU</span>
            </div>
          </div>

          <Link href="/sobre" className="block w-full">
             <button
              type="button"
              className="group flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-600 transition-colors"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              Sobre o Projeto
            </button>
          </Link>
        </div>

      </div>
      
      <p className="mt-8 text-center text-xs text-gray-400">
        © 2025 ConectaEDU. Todos os direitos reservados.
      </p>
    </main>
  );
}