import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU - Login',
  description: 'Entre na sua conta ConectaEDU',
};
export default function PaginaLoginSimples() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-gray-600 hover:text-blue-600 transition-colors text-2xl flex items-center gap-2 font-medium"
        aria-label="Voltar para a página inicial"
      >
        <span></span> <span className="text-base">Voltar</span>
      </Link>
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
            <Link href="/responsavel/atividades" className="w-full block">
            <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Entrar
            </button>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-1 pt-4 text-xs text-gray-600">
            <a href="/responsavel/RedefinirSenha" className="hover:underline">
              Esqueci minha senha
            </a>
            <div className="flex gap-1">
              <span>Não possuo cadastro?</span>
              <a href="/responsavel/cadastro" className="text-blue-600 hover:underline font-semibold">
                Criar conta
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}