import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU',
  description: 'Selecione sua função para continuar',
};
export default function PaginaSelecaoFuncao() {
  return (
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
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Qual é a sua função?
        </h1>
        <div className="space-y-4">
          <Link href="/professor/login" className="block w-full">
            <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Professor
            </button>
          </Link>
          <Link href="/responsavel/login" className="block w-full">
             <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Pai ou responsável
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}