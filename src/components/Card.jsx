import { useState, useRef, useEffect } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { 
  Pencil, Save, X, 
  CreditCard, Tag, User, Clock, 
  ArrowRight, Copy, Archive, Trash2 
} from 'lucide-react'

// Componente auxiliar para los botones del menú 
const MenuButton = ({ icon: Icon, label, onClick, variant = "default" }) => (
  <button 
    onClick={(e) => {
      e.stopPropagation()
      onClick && onClick()
    }}
    className={`
      flex items-center gap-2 w-full text-left px-3 py-1.5 rounded text-sm transition mb-1
      ${variant === "danger" 
        ? "bg-red-900/30 text-red-200 hover:bg-red-900/50" 
        : "bg-black/60 text-gray-300 hover:bg-black/80 hover:text-white hover:translate-x-1"
      }
    `}
  >
    <Icon size={14} />
    <span>{label}</span>
  </button>
)

export default function Card({ card, index, listId, deleteCard, updateCard, onOpenModal }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  
  const cardRef = useRef(null)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

  const handleSave = () => {
    if (!title.trim()) return
    updateCard(listId, card.id, title)
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteCard(listId, card.id)
  }

  const onEditClick = (e) => {
    e.stopPropagation()
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width
      })
    }
    setIsEditing(true)
  }

  // --- MODO EDICIÓN FLOTANTE---
  if (isEditing) {
    return (
      <div className="relative">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/60 z-40" 
          onClick={() => setIsEditing(false)} 
        />

        {/* EDITOR FLOTANTE */}
        <div 
          className="fixed z-50 flex gap-2 items-start"
          style={{ 
            top: coords.top, 
            left: coords.left,
          }}
        >
          {/* COLUMNA IZQUIERDA: EDITOR + GUARDAR */}
          <div style={{ width: coords.width }}> 
            
            <div className="bg-[#22272B] rounded shadow-xl mb-2 border border-blue-400"> 
              <textarea
                autoFocus
                className="w-full bg-[#22272B] text-white text-sm p-2 rounded outline-none resize-none h-24 align-top"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); handleSave();
                  }
                }}
              />
            </div>
            
            <button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded shadow-md transition"
            >
              Guardar
            </button>
          </div>

          {/* COLUMNA DERECHA: MENÚ LATERAL */}
          <div className="flex flex-col w-40 shrink-0">
             <MenuButton icon={CreditCard} label="Abrir tarjeta" onClick={() => {
                setIsEditing(false) 
                onOpenModal(card)  
              }} />
              <MenuButton icon={Tag} label="Editar etiquetas" />
             <MenuButton icon={User} label="Cambiar miembros" />
             <MenuButton icon={Clock} label="Editar fechas" />
             <MenuButton icon={ArrowRight} label="Mover" />
             <MenuButton icon={Copy} label="Copiar tarjeta" />
             
             <div className="mt-2">
                <MenuButton 
                  icon={Archive} 
                  label="Archivar" 
                  onClick={handleDelete} 
                  variant="danger" 
                />
             </div>
          </div>
        </div>
      </div>
    )
  }

  // --- MODO NORMAL---
  return (
   <Draggable draggableId={`card-${card.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={(node) => {
            provided.innerRef(node)
            cardRef.current = node
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group relative flex justify-between items-start gap-2
            bg-[#22272B] p-2 rounded shadow-sm text-sm text-white break-words mb-2
            hover:ring-2 hover:ring-blue-500 cursor-pointer
            ${snapshot.isDragging ? 'bg-[#2C333A] shadow-xl rotate-2' : ''}
          `}
          style={{ ...provided.draggableProps.style }}
        >
          <span>{card.title}</span>

          <button 
            onClick={onEditClick}
            className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-black/20 bg-[#22272B]"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}
    </Draggable>
  )
}