import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useBoards } from '../hooks/useBoards'
import { useNavigate } from 'react-router-dom'
import { 
    Layout, 
    LayoutTemplate, 
    Home, 
    Users, 
    Settings, 
    Plus, 
    Lock, 
    User as UserIcon 
} from 'lucide-react'
import Loader from '../components/Loader'

export default function Board() {
  const { user } = useAuth()
  const { boards, isLoading, fetchBoards, createBoard } = useBoards()
  const navigate = useNavigate()
  
  const [isAddingBoard, setIsAddingBoard] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchBoards()
  }, [])

  const handleCreateBoard = async (e) => {
    e.preventDefault()
    if (!newBoardTitle.trim()) return

    setIsCreating(true)
    await createBoard(newBoardTitle, 'linear-gradient(to bottom right, #0079bf, #5067c5)') 
    setNewBoardTitle('')
    setIsCreating(false)
    setIsAddingBoard(false) 
  }

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'W'

  return (
    <div className="min-h-screen bg-[#1D2125] text-[#B6C2CF] flex flex-col font-sans">
      <Navbar user={user} />
      
      <div className="flex flex-1 max-w-[1200px] mx-auto w-full mt-10 px-4 items-start gap-8">
      
        <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-10">
            <nav className="space-y-1 mb-4">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-[#579DFF] bg-[#1C2B41] rounded-[4px]">
                    <Layout size={16} /> Tableros
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#B6C2CF] hover:bg-[#A6C5E2]/10 rounded-[4px] transition">
                    <LayoutTemplate size={16} /> Plantillas
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#B6C2CF] hover:bg-[#A6C5E2]/10 rounded-[4px] transition">
                    <Home size={16} /> Inicio
                </button>
            </nav>

            <div className="border-t border-gray-700/50 my-2"></div>

            <div className="mt-2">
                <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-xs font-bold text-[#9FADBC]">Espacios de trabajo</span>
                    <button className="text-[#9FADBC] hover:text-[#B6C2CF]"><Plus size={14}/></button>
                </div>

                <div className="mt-1 space-y-1">
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-[#A6C5E2]/10 rounded-[4px]">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-600 rounded-[3px] flex items-center justify-center text-white text-xs font-bold">
                                {userInitial}
                            </div>
                            <span className="text-sm font-bold text-white">Mi Espacio</span>
                        </div>
                        <span className="text-xs">v</span>
                    </button>

                    <div className="pl-9 pr-3 py-1 space-y-1">
                        <button className="w-full flex items-center gap-2 py-1.5 text-sm font-medium text-[#B6C2CF] hover:bg-[#A6C5E2]/10 rounded-[4px] px-2 transition">
                            <Layout size={14} /> Tableros
                        </button>
                        <button className="w-full flex items-center gap-2 py-1.5 text-sm font-medium text-[#B6C2CF] hover:bg-[#A6C5E2]/10 rounded-[4px] px-2 transition flex-1 justify-between">
                            <div className="flex items-center gap-2"><UserIcon size={14} /> Miembros</div>
                            <Plus size={14} className="text-[#9FADBC]"/>
                        </button>
                        <button className="w-full flex items-center gap-2 py-1.5 text-sm font-medium text-[#B6C2CF] hover:bg-[#A6C5E2]/10 rounded-[4px] px-2 transition">
                            <Settings size={14} /> Configuración
                        </button>
                    </div>
                </div>
            </div>
        </aside>

    
        <main className="flex-1 w-full pb-12">
            
            <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-[4px] flex items-center justify-center text-white text-3xl font-bold shadow-md">
                    {userInitial}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        Mi Espacio de Trabajo <PencilIcon />
                    </h1>
                    <div className="flex items-center gap-1 text-xs text-[#9FADBC]">
                        <Lock size={12} /> Privada
                    </div>
                </div>
            </div>

            {/* Sección: Tus Tableros */}
            <div className="flex items-center gap-3 mb-4">
                <UserIcon size={20} className="text-[#9FADBC]" />
                <h2 className="text-base font-bold text-white uppercase tracking-wide">Tus Tableros</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                
                {!isAddingBoard ? (
                    <button 
                        onClick={() => setIsAddingBoard(true)}
                        className="h-[96px] bg-[#282E33] hover:bg-[#333C43] rounded-[3px] flex items-center justify-center text-sm font-medium text-[#B6C2CF] transition"
                    >
                        Crear un tablero nuevo
                    </button>
                ) : (
                    <div className="h-[96px] bg-[#282E33] rounded-[3px] p-2 flex flex-col justify-between shadow-lg border border-blue-500">
                        <form onSubmit={handleCreateBoard} className="h-full flex flex-col justify-between">
                            <input 
                                className="w-full bg-[#22272B] text-white text-sm border border-gray-600 focus:border-blue-500 focus:outline-none rounded-[3px] px-2 py-1.5"
                                placeholder="Título del tablero..."
                                value={newBoardTitle}
                                onChange={(e) => setNewBoardTitle(e.target.value)}
                                autoFocus
                            />
                            <div className="flex items-center gap-2 mt-2">
                                <button 
                                    type="submit" 
                                    disabled={isCreating || !newBoardTitle}
                                    className="bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] text-xs font-semibold px-3 py-1.5 rounded-[3px] transition disabled:opacity-50"
                                >
                                    {isCreating ? '...' : 'Crear'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setIsAddingBoard(false)
                                        setNewBoardTitle('')
                                    }}
                                    className="text-[#9FADBC] hover:text-white p-1"
                                >
                                    ✕
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {boards.map((board) => (
                    <div 
                        key={board.id} 
                        onClick={() => navigate(`/board/${board.id}`)}
                        className="h-[96px] rounded-[3px] cursor-pointer group relative overflow-hidden"
                        style={{ 
                            background: board.background || '#1D2125',
                            backgroundColor: !board.background?.includes('url') && !board.background?.includes('gradient') ? board.background : undefined
                        }}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200"></div>
                        
                        <div className="relative p-3 h-full flex flex-col justify-between z-10">
                            <h3 className="font-bold text-white text-base truncate drop-shadow-md">
                                {board.title}
                            </h3>
                            
                            {board.owner_id !== user.id && (
                                <div className="self-end bg-black/40 p-1 rounded-[3px]" title="Compartido contigo">
                                    <Users size={12} className="text-white"/>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

            </div>
            
            {isLoading && boards.length === 0 && (
                <Loader fullScreen text="Cargando tus tableros..." />
                
            )}

        </main>
      </div>
    </div>
  )
}

const PencilIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9FADBC] hover:text-white cursor-pointer ml-1">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
)