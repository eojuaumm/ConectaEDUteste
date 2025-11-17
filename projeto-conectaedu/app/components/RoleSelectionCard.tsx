// app/escolhafuncao/components/RoleSelectionCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Componente de botão reutilizável
function RoleButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    // 'Link' do Next.js para navegação
    <Link href={href} className="w-full">
      <button
        type="button"
        // Classes Tailwind usando as cores personalizadas 'conecta-teal'
        className="flex w-full justify-center rounded-md border border-transparent bg-conecta-teal px-4 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-conecta-teal focus:ring-offset-2 transition duration-150 ease-in-out"
      >
        {children}
      </button>
    </Link>
  );
}

export default function RoleSelectionCard() {
  return (
    // Card Principal com a cor personalizada 'conecta-purple'
    <div className="w-full max-w-sm rounded-4xl bg-conecta-purple p-8 shadow-2xl">
      
      {/* Container para o logo centralizado */}
      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-white p-4 shadow-lg">
          {/* Caminho do logo: certifique-se de que o arquivo está em 'public/images/logo-conectaedu.jpg' */}
          <Image
            src="/images/logo-conectaedu.jpg" 
            alt="Logo ConectaEDU"
            width={80}
            height={80}
            className="rounded-full object-cover" 
          />
        </div>
      </div>
      
      {/* Título */}
      <h1 className="text-center text-xl font-semibold text-white mb-8">
        Qual é a sua função?
      </h1>
      
      {/* Opções de Função (Botões) */}
      <div className="space-y-4">
        {/* Ajuste os hrefs para as rotas corretas após a seleção */}
        <RoleButton href="/professor/dashboard">
          Professor
        </RoleButton>
        <RoleButton href="/login/">
          Pai ou responsável
        </RoleButton>
      </div>
    </div>
  );
}