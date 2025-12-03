import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU - Redefinição',
  description: 'Redefina sua senha ConectaEDU',
};
export default function PaginaRedefinirSenha() {
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
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Redefinir Senha
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Informe o e-mail associado à sua conta para receber as instruções de recuperação.
        </p>
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Enviar Instruções
            </button>
          </div>
          <div className="flex justify-center pt-2 text-sm">
            <Link href="/responsavel/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
               Voltar para o Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}