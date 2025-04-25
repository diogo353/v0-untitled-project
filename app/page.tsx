import { PronunciationTutor } from "@/components/pronunciation-tutor"
import { EnhancedMatrixBackground } from "@/components/enhanced-matrix-background"
import { GlitchText } from "@/components/glitch-text"

export default function Home() {
  return (
    <main className="min-h-screen bg-black py-6 sm:py-12 px-3 sm:px-4 text-green-500 relative overflow-hidden">
      {/* Usando o EnhancedMatrixBackground para melhor visibilidade */}
      <EnhancedMatrixBackground />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-green-400 mb-2 uppercase shadow-glow-text">
            <GlitchText text="CYBER PRONUNCIATION SYSTEM" className="font-mono" />
          </h1>
          <p className="text-sm sm:text-base text-green-500 font-mono">
            <GlitchText text="TREINAMENTO AVANÇADO DE PRONÚNCIA // VERSÃO 3.0" />
          </p>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-glow-card p-4 sm:p-6 md:p-8 border border-green-500">
          <PronunciationTutor />
        </div>

        <div className="mt-4 sm:mt-8 text-center text-xs sm:text-sm text-green-600 font-mono">
          <p>
            <GlitchText text="SISTEMA INICIALIZADO // PRONTO PARA OPERAÇÃO // ACESSO AUTORIZADO" />
          </p>
        </div>
      </div>
    </main>
  )
}
