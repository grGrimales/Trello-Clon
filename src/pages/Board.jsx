import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function Board() {
  const { user } = useAuth()
  const { boards, isLoading, fetchBoards, createBoard } = useBoards()
  const navigate = useNavigate()
  // Estado local para el input de crear
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  // Cargar tableros al entrar
  useEffect(() => {
    fetchBoards()
  }, [])

  const handleCreateBoard = async (e) => {
    e.preventDefault()
    if (!newBoardTitle.trim()) return

    setIsCreating(true)
    // Por defecto creamos con color azul, luego haremos selector de color
    await createBoard(newBoardTitle, 'bg-blue-600') 
    setNewBoardTitle('')
    setIsCreating(false)
  }

  return (
    <div className="min-h-screen bg-[#1D2125]">
      <Navbar user={user} />
      
      <main className="p-8 max-w-7xl mx-auto">
        
        {/* Título Sección */}
        <div className="flex items-center gap-2 text-gray-400 font-bold mb-4 uppercase text-sm tracking-wider">
          <span className="text-xl">📋</span> Tus Tableros
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* TARJETA 1: Crear Nuevo Tablero (Siempre visible al inicio) */}
          <div className="h-28 bg-[#22272B] rounded-lg p-3 flex flex-col justify-between transition border border-transparent hover:border-blue-500">
             <form onSubmit={handleCreateBoard} className="h-full flex flex-col justify-between">
                <h3 className="text-sm font-medium text-gray-300">Crear tablero nuevo</h3>
                <div className="space-y-2">
                    <input 
                        className="w-full bg-transparent text-white text-sm border-b border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-600 pb-1"
                        placeholder="Título del tablero..."
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={isCreating || !newBoardTitle}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                        >
                            {isCreating ? '...' : 'Crear'}
                        </button>
                    </div>
                </div>
             </form>
          </div>

          {/* LISTA DE TABLEROS EXISTENTES */}
          {boards.map((board) => (
            <div 
                key={board.id} 
                onClick={() => navigate(`/board/${board.id}`)}
                className={`h-28 rounded-lg p-4 cursor-pointer hover:opacity-90 transition shadow-lg relative group flex items-start justify-between ${board.background.startsWith('#') ? '' : board.background}`}
                style={board.background.startsWith('#') ? { backgroundColor: board.background } : {}}
            >
                <h3 className="font-bold text-white text-lg truncate shadow-black drop-shadow-md">
                    {board.title}
                </h3>
                
                {/* Indicador visual si es compartido (opcional futuro) */}
                {board.owner_id !== user.id && (
                     <span title="Compartido contigo" className="bg-black/30 text-xs text-white px-1 rounded">👥</span>
                )}
            </div>
          ))}

        </div>
        
        {/* Mensaje si está cargando */}
        {isLoading && boards.length === 0 && (
            <p className="mt-8 text-center text-gray-500">Cargando tus espacios...</p>
        )}
      </main>
    </div>
  )
}