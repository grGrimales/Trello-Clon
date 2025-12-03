import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd' 
import Card from './Card' 

export default function List({ list, createCard, deleteCard, updateCard }) {
  const [isEditing, setIsEditing] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cardTitle.trim()) return
    await createCard(list.id, cardTitle)
    setCardTitle('')
    setIsEditing(false) 
  }

  return (
    <div className="w-72 shrink-0 bg-[#101204] rounded-xl p-3 text-gray-300 h-fit max-h-full flex flex-col shadow-md border border-gray-800">
      
      <div className="font-bold text-sm mb-2 px-2 flex justify-between items-center">
        {list.title}
        <span className="cursor-pointer hover:text-white">...</span>
      </div>

      {/* ZONA DROPPABLE */}
      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2 overflow-y-auto pr-1 custom-scrollbar min-h-[10px]"
          >
            {list.cards && list.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} listId={list.id} deleteCard={deleteCard} updateCard={updateCard} />
            ))}
            {provided.placeholder} {/* Espacio fantasma al arrastrar */}
          </div>
        )}
      </Droppable>

      {/* Formulario */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-2">
          <textarea
            autoFocus
            className="w-full bg-[#22272B] text-white text-sm p-2 rounded border border-blue-500 outline-none resize-none h-20 block"
            placeholder="Título de la tarjeta..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex items-center gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700">
              Añadir
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white px-2">✕</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)} className="mt-2 text-left text-sm text-gray-400 hover:bg-[#22272B] p-2 rounded transition hover:text-white w-full flex items-center gap-1">
          <span>+</span> Añadir tarjeta
        </button>
      )}
    </div>
  )
}