import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU - Cadastro',
  description: 'Crie sua conta no ConectaEDU',
};

export default function TelaCadastro() {
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
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Crie sua conta
        </h2>
        <form className="space-y-4">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
          </div>
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
              placeholder="Crie uma senha segura"
            />
          </div>
          <div>
            <label 
              htmlFor="confirm-password" 
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Senha
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Repita a senha"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Cadastrar
            </button>
          </div>
          <div className="flex flex-col items-center space-y-1 pt-4 text-xs text-gray-600">
            <span className="text-gray-500">Já possui uma conta?</span>
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Fazer Login
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}