import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ConectaEDU - Área do Professor',
  description: 'Login exclusivo para professores',
};

export default function LoginProfessor() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-gray-600 hover:text-conecta-purple transition-colors text-xl flex items-center gap-2 font-medium"
        aria-label="Voltar para a página inicial"
      >
        <span></span> <span className="text-sm">Voltar</span>
      </Link>

      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg border-t-4 border-conecta-purple">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/images/logoconectaedureso.png"
            alt="Logo ConectaEDU"
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Área do Professor
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Introduza as suas credenciais para continuar
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Institucional
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-conecta-purple focus:outline-none focus:ring-conecta-purple sm:text-sm transition-all"
              placeholder="prof.nome@escola.com"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-conecta-purple focus:outline-none focus:ring-conecta-purple sm:text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-conecta-purple focus:ring-conecta-purple"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/RedefinirSenha" className="font-medium text-conecta-purple hover:text-purple-700">
                Esqueceu a senha?
              </Link>
            </div>
          </div>

          <div>
             <Link href="/professor/dashboard" className="w-full block">
             <button
             type="button"
             className="flex w-full justify-center rounded-md bg-[#5B3A9A] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#4a2e7d] focus:outline-none focus:ring-2 focus:ring-[#5B3A9A] focus:ring-offset-2 transition duration-150 ease-in-out"
             >
             Entrar no Portal
             </button>
             </Link>
          </div>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
           <p className="text-xs text-gray-500">
             Ainda não tem acesso? Contacte a secretaria da sua escola.
           </p>
        </div>
      </div>
    </main>
  );
}