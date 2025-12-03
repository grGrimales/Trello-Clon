import { useState, useEffect } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useBoardData } from '../hooks/useBoardData'
import List from '../components/List'
import { DragDropContext } from '@hello-pangea/dnd' 
import { useActiveBoardStore } from '../store/activeBoardStore'


export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const { board, lists, loading, error, createList, createCard, saveCardOrder, deleteCard, updateCard } = useBoardData(boardId)
  const moveCard = useActiveBoardStore(state => state.moveCard)

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

 // FUNCIÓN QUE SE EJECUTA AL SOLTAR UNA TARJETA
 const onDragEnd = async (result) => {
    const { destination, source } = result;

    // 1. Validaciones básicas
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    moveCard(result);

    // 3. PERSISTENCIA (Guardar en BD)
    // Leemos el estado actualizado directamente del Store para tener la "foto" final
    const currentLists = useActiveBoardStore.getState().lists;
    
    // Buscamos la lista donde cayó la tarjeta (Destino)
    const destList = currentLists.find(l => l.id.toString() === destination.droppableId);
    
    if (destList) {
      await saveCardOrder(destList.id, destList.cards);
      
    
      if (source.droppableId !== destination.droppableId) {
         const sourceList = currentLists.find(l => l.id.toString() === source.droppableId);
         if (sourceList) {
            await saveCardOrder(sourceList.id, sourceList.cards);
         }
      }
    }
  }

  if (loading) return <div className="h-screen bg-[#1D2125] text-white p-10">Cargando...</div>
  if (!board) return null

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              <List 
                key={list.id} 
                list={list} 
                createCard={createCard} 
                deleteCard={deleteCard}
                updateCard={updateCard}
              />
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
    </DragDropContext>
  )
}