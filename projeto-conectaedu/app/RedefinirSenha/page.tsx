// app/redefinir-senha/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// Componente para a tela de Redefinição de Senha
export default function PaginaRedefinirSenha() {
  
  // O componente de seta de retorno será encapsulado em um Link para navegar para a tela de login
  const VoltarParaLogin = () => (
    <Link 
      href="/login" 
      className="absolute top-8 left-8 text-white z-20 text-3xl cursor-pointer"
      aria-label="Voltar para a página de login"
    >
      ← {/* Seta de retorno estilizada */}
    </Link>
  );

  return (
    // Fundo azul, usando a cor conecta-blue-bg do tailwind.config.js, e layout flex para centralizar
    <main className="flex min-h-screen items-center justify-center bg-conecta-blue-bg relative overflow-hidden p-4">
      
      {/* Simulação do padrão de fundo ondulado abstrato (fundo azul claro na imagem)
        Replicando a estilização de fundo que foi vista em 'app/page.tsx' para consistência.
      */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Onda 1 (Superior esquerda) */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl transform rotate-45 scale-150"></div>
        {/* Onda 2 (Central direita) */}
        <div className="absolute top-1/2 right-0 w-2/3 h-2/3 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2 rotate-12 scale-150"></div>
        {/* Onda 3 (Inferior esquerda) */}
        <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-white/10 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2 -rotate-24 scale-150"></div>
      </div>

      {/* Seta de retorno */}
      <VoltarParaLogin />

      {/* Card de Redefinição de Senha (z-index 10 para ficar acima do fundo) */}
      {/* Estilo:
        - max-w-4xl (largura máxima, para parecer grande como no print)
        - min-h-[400px] (altura mínima para acomodar o conteúdo)
        - bg-conecta-purple (cor de fundo)
        - rounded-4xl (borda arredondada)
      */}
      <div className="z-10 w-full max-w-4xl min-h-[400px] bg-conecta-purple rounded-4xl p-10 shadow-2xl flex items-center justify-between relative">
        
        {/* Coluna da esquerda (Título, Ícone e Formulário) */}
        <div className="flex flex-col justify-center w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-white uppercase">
            REDEFINIR SENHA
          </h1>
          <p className="text-6xl text-white">
            🔑 {/* Simulação do ícone de chave */}
          </p>
          
          <form className="space-y-4 pt-4">
            <p className="text-white text-base">
              INFORME O EMAIL PARA QUAL DESEJA REDEFINIR A SUA SENHA
            </p>
            
            {/* Campo de input para o email */}
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-2xl border-none px-6 py-4 shadow-sm focus:ring-2 focus:ring-white focus:outline-none text-lg text-gray-900"
              placeholder="seu@email.com"
            />
            
            {/* Botão de Redefinir Senha */}
            <button
              type="submit"
              // Usando conecta-teal (verde-água) para o botão, como no print
              className="flex w-full justify-center rounded-2xl border border-transparent bg-conecta-teal px-6 py-4 text-xl font-semibold text-white shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition duration-150 ease-in-out uppercase"
            >
              REDEFINIR SENHA
            </button>
          </form>
        </div>

        {/* Coluna da direita (Logo da ConectaEDU) - Visível em telas maiores */}
        <div className="hidden md:flex justify-center items-center w-1/2">
            <div className="relative w-64 h-64">
                <div className="rounded-full bg-white p-4 shadow-lg absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/images/logo-conectaedu.jpg"
                        alt="Logo ConectaEDU"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full" 
                    />
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}