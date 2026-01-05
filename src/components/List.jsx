import { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import Card from './Card' 
import ListMenu from './ListMenu';
import { MoreHorizontal } from 'lucide-react';

export default function List({ list, index, createCard, deleteCard, updateCard, updateListTitle, onOpenModal, onDeleteList, onCopyList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitleInput, setListTitleInput] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cardTitle.trim()) return
    await createCard(list.id, cardTitle)
    setCardTitle('')
    setIsEditing(false) 
  }

  const handleTitleSubmit = () => {
    setIsEditingTitle(false)
    if (listTitleInput.trim() === list.title) return 
    if (!listTitleInput.trim()) {
        setListTitleInput(list.title) 
        return
    }
    updateListTitle(list.id, listTitleInput)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleTitleSubmit()
    }
  }

  return (
    <Draggable draggableId={`list-${list.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-72 shrink-0 bg-[#101204] rounded-xl p-3 text-gray-300 h-fit max-h-full flex flex-col shadow-md border border-gray-800"
        >
          
          <div 
            {...provided.dragHandleProps}
            className="font-bold text-sm mb-2 px-2 flex justify-between items-center cursor-grab active:cursor-grabbing min-h-[28px] relative"
          >
            {isEditingTitle ? (
                <input 
                    autoFocus
                    value={listTitleInput}
                    onChange={(e) => setListTitleInput(e.target.value)}
                    onBlur={handleTitleSubmit} 
                    onKeyDown={handleKeyDown} 
                    className="bg-[#22272B] text-white px-2 py-1 rounded border border-blue-500 outline-none w-full text-sm font-bold -ml-2"
                />
            ) : (
                <div 
                    onClick={() => setIsEditingTitle(true)}
                    className="w-full truncate cursor-pointer px-1 -ml-1 py-1 rounded hover:bg-white/10 transition"
                >
                    {list.title}
                </div>
            )}

            {!isEditingTitle && (
               <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-[#9FADBC] hover:bg-[#A6C5E2]/10 p-1 rounded transition"
            >
                <MoreHorizontal size={16} />
            </button>
            )}

         {showMenu && (
              <ListMenu 
                listTitle={list.title}
                  onClose={() => setShowMenu(false)} 
                  
                  onDelete={() => {
                      onDeleteList(list.id) 
                      setShowMenu(false)
                  }}

                  onAddCard={() => {
                      setShowMenu(false) 
                      setIsEditing(true) 
                  }}

                  onCopyList={(newTitle) => {
                      onCopyList(list.id, newTitle)
                  }}
              />
            )}
          </div>

             

          <Droppable droppableId={list.id.toString()} type="CARD">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 overflow-y-auto pr-1 custom-scrollbar min-h-[10px] relative"
              >
                {list.cards && list.cards.map((card, index) => (
                  <Card 
                    key={card.id} 
                    card={card} 
                    index={index} 
                    listId={list.id} 
                    deleteCard={deleteCard} 
                    updateCard={updateCard} 
                    onOpenModal={onOpenModal}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

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
                <button type="submit" className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700">Añadir</button>
                <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white px-2">✕</button>
              </div>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)} className="mt-2 text-left text-sm text-gray-400 hover:bg-[#22272B] p-2 rounded transition hover:text-white w-full flex items-center gap-1">
              <span>+</span> Añadir tarjeta
            </button>
          )}

        </div>
      )}
    </Draggable>
  )
}