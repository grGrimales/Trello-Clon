import { useState } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'
import Card from './Card' 
import ListMenu from './ListMenu';
import { MoreHorizontal } from 'lucide-react';

export default function List({ list, index, createCard, deleteCard, updateCard, updateListTitle, onOpenModal, onDeleteList, onCopyList, updateListColor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  
  const [isAddingCard, setIsAddingCard] = useState(false); 

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitleInput, setListTitleInput] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!cardTitle.trim() || isAddingCard) return 
    
    setIsAddingCard(true) 
    try {
        await createCard(list.id, cardTitle)
        setCardTitle('')
        setIsEditing(false) 
    } catch (error) {
        console.error("Error al crear tarjeta:", error)
    } finally {
        setIsAddingCard(false) 
    }
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

  const listStyle = list.color 
    ? { backgroundColor: list.color } 
    : {}

  return (
    <Draggable draggableId={`list-${list.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            ...(list.color ? { backgroundColor: list.color } : {})
          }}
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
                className="cursor-pointer text-[#9FADBC] hover:bg-[#A6C5E2]/10 p-1 rounded transition"
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
                  onUpdateColor={(color) => updateListColor(list.id, color)}
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
                
                <button 
                    type="submit" 
                    disabled={isAddingCard || !cardTitle.trim()}
                    className="cursor-pointer bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] text-sm font-semibold px-3 py-1.5 rounded-[3px] transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px] flex justify-center"
                >
                    {isAddingCard ? '...' : 'Añadir'}
                </button>
                
                <button 
                    type="button" 
                    onClick={() => setIsEditing(false)} 
                    className="cursor-pointer text-[#9FADBC] hover:text-white p-1"
                >
                    ✕
                </button>
              </div>
            </form>
          ) : (
            <button onClick={() => setIsEditing(true)} className=" cursor-pointer mt-2 text-left text-sm text-[#9FADBC] hover:bg-[#A6C5E2]/10 p-2 rounded transition hover:text-[#B6C2CF] w-full flex items-center gap-1">
              <span>+</span> Añadir tarjeta
            </button>
          )}

        </div>
      )}
    </Draggable>
  )
}