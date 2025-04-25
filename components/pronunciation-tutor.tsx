"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NeonButton } from "@/components/neon-button"
import { GlitchText } from "@/components/glitch-text"
import { WordManager } from "@/components/word-manager"

export function PronunciationTutor() {
  const [text, setText] = useState("")
  const [rate, setRate] = useState(0.8)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSpeechSupported, setIsSpeechSupported] = useState(true)
  const [activeTab, setActiveTab] = useState("english-words")
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setIsSpeechSupported(false)
    }

    // Initialize speech synthesis
    speechSynthRef.current = new SpeechSynthesisUtterance()

    // Clean up on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleSpeak = () => {
    if (!text.trim() || !speechSynthRef.current) return

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    // Configure speech settings
    speechSynthRef.current.text = text
    speechSynthRef.current.rate = rate
    speechSynthRef.current.lang = "en-US"

    // Add event listeners
    speechSynthRef.current.onstart = () => setIsPlaying(true)
    speechSynthRef.current.onend = () => setIsPlaying(false)
    speechSynthRef.current.onerror = () => setIsPlaying(false)

    // Start speaking
    window.speechSynthesis.speak(speechSynthRef.current)
  }

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }

  const handleReset = () => {
    setText("")
    setRate(0.8)
    handleStop()
  }

  const handleRateChange = (value: number[]) => {
    setRate(value[0])
  }

  const handleSelectWord = (word: string) => {
    setText(word)
  }

  if (!isSpeechSupported) {
    return (
      <Card className="p-6 bg-black border border-red-500 text-red-500">
        <p className="text-red-500">
          Speech synthesis is not supported in your browser. Please try using a modern browser like Chrome, Firefox, or
          Edge.
        </p>
      </Card>
    )
  }

  const fullSpeechText = `Hoje vou falar sobre o uso da Artificial Intelligence na saúde.
A IA ajuda médicos a analisar exames como X-ray, identificando problemas de forma mais rápida.
Com a tecnologia, o diagnóstico fica mais fast, mais easy e mais safe para os pacientes.
Além disso, a Artificial Intelligence ajuda a evitar erros e a começar tratamentos mais cedo.
A Artificial Intelligence já é uma grande aliada da medicina e está transformando o futuro da saúde.

1. Quick Diagnoses
Análise precisa e eficiente

2. Reliable Results
Tecnologia confiável para pacientes

3. Early Treatment
Intervenção imediata salva vidas`

  const speechSections = [
    {
      title: "Introdução",
      text: "Hoje vou falar sobre o uso da Artificial Intelligence na saúde.",
    },
    {
      title: "Benefício 1",
      text: "A IA ajuda médicos a analisar exames como X-ray, identificando problemas de forma mais rápida.",
    },
    {
      title: "Benefício 2",
      text: "Com a tecnologia, o diagnóstico fica mais fast, mais easy e mais safe para os pacientes.",
    },
    {
      title: "Benefício 3",
      text: "Além disso, a Artificial Intelligence ajuda a evitar erros e a começar tratamentos mais cedo.",
    },
    {
      title: "Conclusão",
      text: "A Artificial Intelligence já é uma grande aliada da medicina e está transformando o futuro da saúde.",
    },
    {
      title: "Tópico 1",
      text: "1. Quick Diagnoses\nAnálise precisa e eficiente",
    },
    {
      title: "Tópico 2",
      text: "2. Reliable Results\nTecnologia confiável para pacientes",
    },
    {
      title: "Tópico 3",
      text: "3. Early Treatment\nIntervenção imediata salva vidas",
    },
  ]

  const defaultEnglishWords = [
    "Artificial Intelligence (Inteligência Artificial)",
    "X-ray (Raio-X)",
    "fast (rápido)",
    "easy (fácil)",
    "safe (seguro)",
    "Quick Diagnoses (Diagnósticos Rápidos)",
    "Reliable Results (Resultados Confiáveis)",
    "Early Treatment (Tratamento Precoce)",
  ]

  return (
    <Tabs defaultValue="english-words" className="hacker-tabs" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-6 bg-black border border-green-500">
        <TabsTrigger
          value="english-words"
          className="data-[state=active]:bg-green-950 data-[state=active]:text-green-400 data-[state=active]:shadow-glow-subtle"
        >
          <GlitchText text="PALAVRAS" />
        </TabsTrigger>
        <TabsTrigger
          value="saved-words"
          className="data-[state=active]:bg-green-950 data-[state=active]:text-green-400 data-[state=active]:shadow-glow-subtle"
        >
          <GlitchText text="MINHAS PALAVRAS" />
        </TabsTrigger>
        <TabsTrigger
          value="full-speech"
          className="data-[state=active]:bg-green-950 data-[state=active]:text-green-400 data-[state=active]:shadow-glow-subtle"
        >
          <GlitchText text="TEXTO COMPLETO" />
        </TabsTrigger>
      </TabsList>

      <div className="space-y-6 mb-6">
        <div className="space-y-2">
          <label
            htmlFor="pronunciation-text"
            className="block text-sm font-medium text-green-500 uppercase tracking-wider"
          >
            <GlitchText text="TEXTO PARA PRATICAR" />
          </label>
          <Textarea
            id="pronunciation-text"
            placeholder="Selecione uma palavra da lista abaixo ou digite aqui..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] resize-y bg-black border-green-500 text-green-400 placeholder:text-green-700 focus:border-green-400 focus:ring-green-400 shadow-glow-subtle"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-green-500 uppercase tracking-wider">
                <GlitchText text="VELOCIDADE" />
              </label>
              <span className="text-sm text-green-500">
                {rate === 0.5
                  ? "MUITO LENTO"
                  : rate < 0.8
                    ? "LENTO"
                    : rate === 1
                      ? "NORMAL"
                      : rate < 1.5
                        ? "RÁPIDO"
                        : "MUITO RÁPIDO"}
              </span>
            </div>
            <Slider
              value={[rate]}
              min={0.5}
              max={1.5}
              step={0.1}
              onValueChange={handleRateChange}
              className="py-2"
              // Custom styling for the slider
              classNameThumb="bg-green-500 border-2 border-black hover:bg-green-400 shadow-glow-subtle"
              classNameTrack="bg-green-900"
              classNameRange="bg-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <NeonButton
              onClick={isPlaying ? handleStop : handleSpeak}
              className="flex-1 min-w-[120px]"
              disabled={!text.trim()}
              glowIntensity="medium"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> <GlitchText text="STOP" />
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> <GlitchText text="PRONOUNCE" />
                </>
              )}
            </NeonButton>

            <NeonButton variant="outline" onClick={handleReset} className="flex-1 min-w-[120px]" glowIntensity="low">
              <RotateCcw className="mr-2 h-4 w-4" /> <GlitchText text="RESET" />
            </NeonButton>
          </div>
        </div>
      </div>

      <TabsContent value="english-words" className="space-y-6">
        <div className="pt-4 border-t border-green-900">
          <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-3">
            <GlitchText text="PALAVRAS EM INGLÊS DA SUA FALA:" />
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {defaultEnglishWords.map((example, index) => (
              <NeonButton
                key={index}
                variant="ghost"
                className="justify-start h-auto py-2 px-3 text-left hover:bg-green-950/30"
                onClick={() => setText(example)}
              >
                <Volume2 className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <span className="truncate">{example}</span>
              </NeonButton>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="saved-words" className="space-y-6">
        <WordManager onSelectWord={handleSelectWord} />
      </TabsContent>

      <TabsContent value="full-speech" className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="full-speech-text"
            className="block text-sm font-medium text-green-500 uppercase tracking-wider"
          >
            <GlitchText text="TEXTO COMPLETO DA APRESENTAÇÃO" />
          </label>
          <div className="bg-black p-4 rounded-md border border-green-500 whitespace-pre-line text-green-400 shadow-glow-subtle">
            {fullSpeechText}
          </div>
        </div>

        <div className="pt-4 border-t border-green-900">
          <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-3">
            <GlitchText text="PRATICAR POR SEÇÕES:" />
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {speechSections.map((section, index) => (
              <Card
                key={index}
                className="p-3 bg-black border border-green-900 hover:border-green-500 hover:shadow-glow-subtle transition-all"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-green-500">{section.title}</h4>
                  <NeonButton size="sm" variant="ghost" onClick={() => setText(section.text)}>
                    <Volume2 className="h-4 w-4" />
                  </NeonButton>
                </div>
                <p className="text-sm text-green-400 mt-1 line-clamp-2">{section.text}</p>
              </Card>
            ))}
          </div>
        </div>

        <NeonButton className="w-full" onClick={() => setText(fullSpeechText)} glowIntensity="high">
          <Play className="mr-2 h-4 w-4" /> <GlitchText text="PRATICAR TEXTO COMPLETO" />
        </NeonButton>
      </TabsContent>
    </Tabs>
  )
}
