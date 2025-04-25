"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"

export type SavedWord = {
  id: string
  english: string
  translation: string
}

interface WordManagerProps {
  onSelectWord: (word: string) => void
}

export function WordManager({ onSelectWord }: WordManagerProps) {
  const [savedWords, setSavedWords] = useState<SavedWord[]>([])
  const [newEnglish, setNewEnglish] = useState("")
  const [newTranslation, setNewTranslation] = useState("")

  // Carregar palavras salvas do localStorage quando o componente montar
  useEffect(() => {
    const storedWords = localStorage.getItem("savedPronunciationWords")
    if (storedWords) {
      try {
        setSavedWords(JSON.parse(storedWords))
      } catch (e) {
        console.error("Erro ao carregar palavras salvas:", e)
        // Se houver erro no parsing, inicializa com array vazio
        setSavedWords([])
      }
    }
  }, [])

  // Salvar palavras no localStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem("savedPronunciationWords", JSON.stringify(savedWords))
  }, [savedWords])

  const addWord = () => {
    if (newEnglish.trim() === "") return

    const newWord: SavedWord = {
      id: Date.now().toString(),
      english: newEnglish.trim(),
      translation: newTranslation.trim() || "(sem tradução)",
    }

    setSavedWords((prev) => [...prev, newWord])
    setNewEnglish("")
    setNewTranslation("")
  }

  const deleteWord = (id: string) => {
    setSavedWords((prev) => prev.filter((word) => word.id !== id))
  }

  const handleWordClick = (word: SavedWord) => {
    const displayText = word.translation ? `${word.english} (${word.translation})` : word.english
    onSelectWord(displayText)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Palavra em inglês"
          value={newEnglish}
          onChange={(e) => setNewEnglish(e.target.value)}
          className="bg-black border-green-500 text-green-400 placeholder:text-green-700"
        />
        <Input
          placeholder="Tradução (opcional)"
          value={newTranslation}
          onChange={(e) => setNewTranslation(e.target.value)}
          className="bg-black border-green-500 text-green-400 placeholder:text-green-700"
        />
        <Button
          onClick={addWord}
          disabled={newEnglish.trim() === ""}
          className="bg-black border border-green-500 text-green-500 hover:bg-green-950 shadow-glow-subtle"
        >
          <Plus className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Adicionar</span>
        </Button>
      </div>

      <div className="border-t border-green-900 pt-4">
        <h3 className="text-sm font-medium text-green-500 uppercase tracking-wider mb-3">
          <GlitchText text="SUAS PALAVRAS SALVAS:" />
        </h3>

        {savedWords.length === 0 ? (
          <Card className="p-3 bg-black border border-green-900 text-center">
            <p className="text-green-600">Nenhuma palavra salva ainda. Adicione palavras acima.</p>
          </Card>
        ) : (
          <div className="grid gap-2">
            {savedWords.map((word) => (
              <Card
                key={word.id}
                className="p-3 bg-black border border-green-900 hover:border-green-500 hover:shadow-glow-subtle transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1 cursor-pointer" onClick={() => handleWordClick(word)}>
                    <p className="font-medium text-green-500">{word.english}</p>
                    {word.translation && <p className="text-sm text-green-600">{word.translation}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteWord(word.id)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
