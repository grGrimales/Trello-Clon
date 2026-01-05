import { useState } from 'react'
import { X, ArrowLeft } from 'lucide-react'

export default function ListMenu({ listTitle, onClose, onDelete, onAddCard, onCopyList }) {
  const [view, setView] = useState('main') 
  const [newTitle, setNewTitle] = useState('') 


const handleCopySubmit = () => {
  console.log('Submitting copy with title:', newTitle);
    if (!newTitle.trim()) return
    onCopyList(newTitle)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-40 cursor-default" onClick={onClose}></div>

      <div 
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-8 -right-3 w-72 bg-[#282E33] rounded-lg shadow-xl border border-gray-700/50 z-50 text-[#B6C2CF] py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right overflow-hidden">
        
        <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-700/50 mb-2 h-8">
            {view !== 'main' ? (
                <button onClick={() => setView('main')} className="text-[#9FADBC] hover:text-white p-1 rounded hover:bg-white/10 absolute left-2">
                    <ArrowLeft size={14} />
                </button>
            ) : null}

            <span className="text-sm font-semibold text-center w-full">
                {view === 'main' ? 'Acciones de la lista' : 'Copiar lista'}
            </span>
            
            <button onClick={onClose} className="text-[#9FADBC] hover:text-white p-1 hover:bg-white/10 rounded transition absolute right-2">
                <X size={14} />
            </button>
        </div>

        {view === 'main' && (
            <div className="space-y-1">
                <button onClick={onAddCard} className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                    Añadir tarjeta...
                </button>
                
                <button 
                    onClick={() => setView('copy')}
                    className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors"
                >
                    Copiar lista...
                </button>

                <button className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                    Mover lista...
                </button>
                <button className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                    Seguir
                </button>

                <div className="my-2 border-b border-gray-700/50"></div>

                <button onClick={onDelete} className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] text-sm text-[#B6C2CF] hover:text-red-400 transition-colors">
                    Archivar esta lista
                </button>
            </div>
        )}

        {view === 'copy' && (
            <div className="px-3 pb-2">
                <label className="text-xs font-bold text-[#9FADBC] mb-1 block">Nombre</label>
                
                <textarea 
                    className="w-full bg-[#22272B] border border-[#A6C5E2]/30 focus:border-[#579DFF] rounded-[3px] px-2 py-2 text-sm text-[#B6C2CF] outline-none transition resize-none h-18 mb-3"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    
                />

                <button 
                    onClick={handleCopySubmit}
                    className="bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] font-semibold text-sm py-1.5 px-4 rounded-[3px] transition w-fit"
                >
                    Crear lista
                </button>
            </div>
        )}

      </div>
    </>
  )
}