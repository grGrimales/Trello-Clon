import { useState, useEffect } from 'react' // useEffect solo si necesitamos redirigir
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useBoardData } from '../hooks/useBoardData'

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const { board, lists, loading, error, createList } = useBoardData(boardId)

  const [isAddingList, setIsAddingList] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')

  useEffect(() => {
    if (error) navigate('/')
  }, [error, navigate])

  const handleSubmitList = async (e) => {
    e.preventDefault()
    if (!newListTitle.trim()) return

    const success = await createList(newListTitle)
    if (success) {
      setNewListTitle('')
      setIsAddingList(false)
    }
  }

  if (loading) return <div className="h-screen bg-[#1D2125] text-white p-10">Cargando...</div>
  if (!board) return null

  return (
    <div 
      className="h-screen flex flex-col"
      style={{ backgroundColor: board.background.startsWith('#') ? board.background : undefined }} 
    >
      <div className={`flex-1 flex flex-col h-full ${!board.background.startsWith('#') ? board.background : ''}`}>
        
        <Navbar user={user} />

        <div className="h-14 bg-black/20 backdrop-blur-sm px-4 flex items-center justify-between text-white">
          <h1 className="font-bold text-lg px-3 py-1 rounded hover:bg-white/20 cursor-pointer transition">
            {board.title}
          </h1>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex h-full gap-4">
            
            {/* Listas */}
            {lists.map((list) => (
              <div key={list.id} className="w-72 shrink-0 bg-[#101204] rounded-xl p-3 text-gray-300 h-fit max-h-full flex flex-col shadow-md border border-gray-800">
                  <div className="font-bold text-sm mb-2 px-2 flex justify-between items-center">
                    {list.title}
                    <span className="cursor-pointer hover:text-white">...</span>
                  </div>
                  <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                     {list.cards && list.cards.map(card => (
                       <div key={card.id} className="bg-[#22272B] p-2 rounded shadow-sm text-sm hover:ring-2 hover:ring-blue-500 cursor-pointer text-white">
                         {card.title}
                       </div>
                     ))}
                  </div>
                  <button className="mt-2 text-left text-sm text-gray-400 hover:bg-[#22272B] p-2 rounded transition hover:text-white">
                    + Añadir tarjeta
                  </button>
              </div>
            ))}

            {/* Formulario de Nueva Lista */}
            <div className="w-72 shrink-0">
              {!isAddingList ? (
                <button 
                  onClick={() => setIsAddingList(true)}
                  className="w-full h-12 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold flex items-center px-4 transition text-left backdrop-blur-sm"
                >
                  + Añadir otra lista
                </button>
              ) : (
                <form onSubmit={handleSubmitList} className="bg-[#101204] rounded-xl p-3 border border-gray-700">
                  <input 
                    autoFocus
                    className="w-full bg-[#22272B] text-white text-sm p-2 rounded border border-blue-500 outline-none mb-2"
                    placeholder="Introduzca el título..."
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <button type="submit" className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700">
                      Añadir lista
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsAddingList(false)} 
                      className="text-gray-400 hover:text-white px-2"
                    >
                      ✕
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}