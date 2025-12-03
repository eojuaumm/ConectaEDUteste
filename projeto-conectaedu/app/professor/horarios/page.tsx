import React from "react";

export default function HorarioTurma1() {
  const days = [
    "SEGUNDA-FEIRA",
    "TERÇA-FEIRA",
    "QUARTA-FEIRA",
    "QUINTA-FEIRA",
    "SEXTA-FEIRA",
  ];

  const materias = [
    "Matéria 1",
    "Matéria 2",
    "Matéria 3",
    "Matéria 4",
    "Matéria 5",
  ];

  return (
    <div className="min-h-screen scale-90 md:scale-75 origin-top relative bg-gray-100 text-gray-900 font-sans">
      {/* BACKGROUND WAVES (SVG) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#0ea5a6" stopOpacity="0.99" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.99" />
            </linearGradient>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.99" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.99" />
            </linearGradient>
          </defs>

          <path
            d="M0,200 C200,100 400,300 600,50 C1040,100 1200,360 1440,260 L1440,800 L0,800 Z"
            fill="url(#g1)"
          />
          <path
            d="M0,320 C240,220 480,420 840,320 C1160,230 1280,480 1440,380 L1440,800 L0,800 Z"
            fill="url(#g2)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Topbar */}
      <header className="flex items-center justify-between p-6">
        <button className="p-2 rounded-md bg-white/40 backdrop-blur-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">TURMA 1 - HORÁRIOS</h1>
        </div>

        {/* Usuário removido */}
        <div className="w-10 h-10"></div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {days.slice(0, 3).map((day) => (
            <section key={day} className="bg-transparent">
              <div className="inline-block bg-white/30 rounded-full px-6 py-2 mb-4 text-sm font-semibold text-white">
                {day}
              </div>

              <div className="bg-white/70 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-teal-500/90 text-white font-semibold">Horário — Matéria</div>
                <div className="divide-y">
                  {materias.map((m, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="text-sm font-medium text-teal-700">0h - 0h</div>
                      <div className="flex-1 px-4">
                        <div className="text-sm font-semibold">{m}</div>
                        <div className="text-xs text-right text-gray-600">
                          {i % 2 === 0 ? "Você" : "Professor(a)/ usuário " + (i + 1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {days.slice(3).map((day) => (
            <section key={day}>
              <div className="inline-block bg-white/30 rounded-full px-6 py-2 mb-4 text-sm font-semibold text-white">
                {day}
              </div>

              <div className="bg-white/70 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-teal-500/90 text-white font-semibold">Horário — Matéria</div>
                <div className="divide-y">
                  {materias.map((m, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="text-sm font-medium text-teal-700">0h - 0h</div>
                      <div className="flex-1 px-4">
                        <div className="text-sm font-semibold">{m}</div>
                        <div className="text-xs text-right text-gray-600">
                          {i % 2 === 0 ? "Você" : "Professor(a)/ usuário " + (i + 1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
