import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | ConectaEDU',
    default: 'ConectaEDU - Gestão Escolar',
  },
  description: "Plataforma integrada de gestão escolar para professores, alunos e responsáveis.",
  
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: 'ConectaEDU',
    description: 'Transformando a educação com tecnologia.',
    url: 'https://conectaedu.com.br',
    siteName: 'ConectaEDU',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}