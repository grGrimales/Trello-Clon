import { useState } from 'react'
import { X, ArrowLeft, Image } from 'lucide-react'

const BACKGROUNDS = [
  { name: 'Azul Trello', value: 'linear-gradient(to bottom right, #0079bf, #5067c5)' },
  { name: 'Naranja', value: 'linear-gradient(to bottom right, #d29034, #b04632)' },
  { name: 'Verde', value: 'linear-gradient(to bottom right, #519839, #4bbf6b)' },
  { name: 'Rojo', value: 'linear-gradient(to bottom right, #b04632, #89609e)' },
  { name: 'Púrpura', value: 'linear-gradient(to bottom right, #89609e, #cd5a91)' },
  { name: 'Rosa', value: 'linear-gradient(to bottom right, #cd5a91, #d29034)' },
  { name: 'Gris', value: '#838c91' },
  { name: 'Negro', value: '#1D2125' }, 
]

export default function BoardMenu({ isOpen, onClose, currentBackground, onUpdateBackground }) {
  const [view, setView] = useState('main') 

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-[#282E33] shadow-2xl transform transition-transform duration-300 z-[100] border-l border-gray-700 text-[#B6C2CF]">
      
      {/* --- CABECERA --- */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-gray-700/50">
        {view === 'backgrounds' ? (
           <button onClick={() => setView('main')} className="hover:text-white p-1 rounded hover:bg-white/10">
             <ArrowLeft size={16} />
           </button>
        ) : <div className="w-6"></div>} 

        <h3 className="font-semibold text-sm">
            {view === 'main' ? 'Menú' : 'Cambiar fondo'}
        </h3>
        
        <button onClick={onClose} className="hover:text-white p-1 rounded hover:bg-white/10">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-full">
        
        {/* VISTA PRINCIPAL */}
        {view === 'main' && (
          <div className="space-y-4">
             {/* Opción Cambiar Fondo */}
             <div 
                onClick={() => setView('backgrounds')}
                className="group cursor-pointer"
             >
                <div className="h-24 rounded-lg mb-2 relative overflow-hidden border border-gray-600 group-hover:opacity-90 transition">
                    <div className="absolute inset-0" style={{ background: currentBackground }}></div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="font-bold text-white drop-shadow-md">Cambiar fondo</span>
                    </div>
                </div>
             </div>

             <hr className="border-gray-700/50 my-4" />
             
             <div className="text-xs text-center text-gray-500 mt-10">
                 Hecho con ❤️ en Trello Clone
             </div>
          </div>
        )}

        {/* VISTA SELECCIÓN DE COLORES */}
        {view === 'backgrounds' && (
           <div className="grid grid-cols-2 gap-2">
              {BACKGROUNDS.map((bg, idx) => (
                  <button
                    key={idx}
                    onClick={() => onUpdateBackground(bg.value)}
                    className="h-20 rounded-lg hover:brightness-110 transition relative border border-transparent hover:border-white/50"
                    style={{ background: bg.value }}
                    title={bg.name}
                  >
                     {/* Check si está seleccionado */}
                     {currentBackground === bg.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xl drop-shadow-md">✓</span>
                        </div>
                     )}
                  </button>
              ))}
           </div>
        )}

      </div>
    </div>
  )
}