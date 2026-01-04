import { X } from 'lucide-react'

export default function ListMenu({ onClose, onDelete, onAddCard }) {
  return (
    <>
      <div 
        className="fixed inset-0 z-40 cursor-default" 
        onClick={onClose}
      ></div>

      <div className="absolute top-8 -right-3 w-72 bg-[#282E33] rounded-lg shadow-xl border border-gray-700/50 z-50 text-[#B6C2CF] py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
        
        <div className="flex items-center justify-between px-4 pb-2 border-b border-gray-700/50 mb-2">
          <span className="text-sm font-semibold text-center w-full ml-6">Acciones de la lista</span>
          <button onClick={onClose} className="text-[#9FADBC] hover:text-white p-1 hover:bg-white/10 rounded transition">
            <X size={14} />
          </button>
        </div>

        {/* Lista de Opciones */}
        <div className="space-y-1">
            
            <button 
                onClick={onAddCard}
                className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors"
            >
                Añadir tarjeta...
            </button>

            <button className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                Copiar lista...
            </button>
            <button className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                Mover lista...
            </button>
            <button className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] cursor-pointer text-sm transition-colors">
                Seguir
            </button>
        </div>

        <div className="my-2 border-b border-gray-700/50"></div>

        <button 
            onClick={onDelete}
            className="w-full text-left px-4 py-1.5 hover:bg-[#333C43] text-sm text-[#B6C2CF] hover:text-red-400 transition-colors"
        >
            Archivar esta lista
        </button>

      </div>
    </>
  )
}