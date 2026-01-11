import { useState } from 'react'
import { X, Pencil, ArrowLeft, Check } from 'lucide-react'

const COLORS_GRID = [
    '#4BCE97', '#F5CD47', '#FEA362', '#F87168', '#9F8FEF',
    '#579DFF', '#60C6D2', '#94C748', '#E774BB', '#8590A2',
    '#216E4E', '#7F5F01', '#A54800', '#AE2E24', '#5E4DB2',
    '#0055CC', '#206A83', '#4C6B1F', '#943D73', '#596773'
]

export default function LabelPicker({ selectedLabels, labelNames, onToggleLabel, onUpdateLabelName, onClose }) {
  const [view, setView] = useState('list')
  const [editingColor, setEditingColor] = useState(null)
  const [titleInput, setTitleInput] = useState('')

  const handleEditClick = (color) => {
    setEditingColor(color)
    setTitleInput(labelNames?.[color] || '')
    setView('edit')
  }

  const handleSave = () => {
    if (editingColor) {
        onUpdateLabelName(editingColor, titleInput)
    }
    setView('list')
  }

  return (
    <div 
        className="absolute top-0 left-0 bg-[#282E33] w-[304px] max-h-[750px] rounded-lg shadow-xl border border-gray-700/50 z-[200] flex flex-col animate-in fade-in zoom-in-95 duration-100 text-[#B6C2CF]"
        onClick={(e) => e.stopPropagation()}
    >
      
      {/* === CABECERA (FIJA) === */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700/50 h-10 shrink-0">
        {view === 'edit' ? (
            <button onClick={() => setView('list')} className="text-[#9FADBC] hover:text-white p-1 absolute left-2">
                <ArrowLeft size={16}/>
            </button>
        ) : <div className="w-4"></div>}

        <span className="text-sm font-semibold w-full text-center">
            {view === 'list' ? 'Etiquetas' : 'Editar etiqueta'}
        </span>
        
        <button onClick={onClose} className="text-[#9FADBC] hover:text-white p-1 absolute right-2">
            <X size={16}/>
        </button>
      </div>

      {/* === CONTENIDO SCROLLABLE === */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          
          {view === 'list' && (
            <>
                <input 
                    type="text" 
                    placeholder="Buscar etiquetas..." 
                    className="w-full bg-[#22272B] border border-gray-700/50 rounded-[3px] px-3 py-1.5 text-sm text-[#B6C2CF] mb-3 outline-none focus:border-blue-500"
                    autoFocus
                />

                <div className="text-xs font-semibold text-[#9FADBC] mb-2">Etiquetas</div>

                <div className="space-y-1">
                    {COLORS_GRID.map((color) => { 
                    const isSelected = selectedLabels.includes(color)
                    const labelName = labelNames?.[color]

                    return (
                        <div key={color} className="flex items-center gap-2 group mb-1">
                            
                            {/* Checkbox */}
                            <div 
                               onClick={() => onToggleLabel(color)}
                               className={`
                                 w-4 h-4 rounded-[2px] border cursor-pointer flex items-center justify-center transition shrink-0 mt-0.5
                                 ${isSelected 
                                    ? 'bg-[#579DFF] border-[#579DFF]' 
                                    : 'border-[#454F59] group-hover:border-[#85B8FF] bg-[#22272B]'
                                 }
                               `}
                            >
                               {isSelected && <Check size={10} strokeWidth={4} className="text-[#1D2125]" />}
                            </div>

                            {/* Barra de Color */}
                            <div 
                                onClick={() => onToggleLabel(color)}
                                className="h-8 grow rounded-[3px] cursor-pointer transition hover:brightness-110 relative flex items-center px-3 overflow-hidden"
                                style={{ backgroundColor: color }}
                            >
                                <span className="text-sm font-bold text-white drop-shadow-md truncate flex-1">
                                    {labelName}
                                </span>
                            </div>

                            {/* Lápiz */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(color)
                                }}
                                className="text-[#9FADBC] hover:bg-[#333C43] p-1.5 rounded transition shrink-0"
                            >
                                <Pencil size={14} />
                            </button>
                        </div>
                    )
                    })}
                </div>
            </>
          )}

          {/* VISTA EDITAR */}
          {view === 'edit' && (
              <div className="space-y-4">
                  <div className="h-24 bg-[#101204] flex items-center justify-center rounded-[3px] border border-gray-700/50 p-4">
                      <div 
                        className="h-8 w-full rounded-[3px] px-3 flex items-center"
                        style={{ backgroundColor: editingColor }}
                      >
                          <span className="font-bold text-white drop-shadow-md text-sm">{titleInput}</span>
                      </div>
                  </div>

                  <div>
                      <label className="text-xs font-bold text-[#9FADBC] mb-1 block uppercase">Título</label>
                      <input 
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        className="w-full bg-[#22272B] border border-gray-700/50 focus:border-blue-500 rounded-[3px] px-2 py-2 text-sm text-[#B6C2CF] outline-none"
                        autoFocus
                      />
                  </div>

                  <div>
                      <label className="text-xs font-bold text-[#9FADBC] mb-1 block uppercase">Seleccionar un color</label>
                      <div className="grid grid-cols-5 gap-2">
                          {COLORS_GRID.map(c => (
                              <button
                                key={c}
                                onClick={() => setEditingColor(c)}
                                className={`h-8 rounded-[3px] hover:brightness-110 transition ${editingColor === c ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-[#282E33]' : ''}`}
                                style={{ backgroundColor: c }}
                              />
                          ))}
                      </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-700/50 mt-4">
                      <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-1.5 px-6 rounded-[3px]">
                          Guardar
                      </button>
                      <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-sm py-1.5 px-4 rounded-[3px]">
                          Eliminar
                  </button>
                  </div>
              </div>
          )}

      </div>

      {view === 'list' && (
          <div className="p-3 pt-2 border-t border-gray-700/50 bg-[#282E33] shrink-0 rounded-b-lg">
                <button className="w-full bg-[#333C43] hover:bg-[#3E474F] text-[#B6C2CF] py-2 rounded-[3px] text-sm font-medium transition">
                    Crear una etiqueta nueva
                </button>
                <button className="w-full mt-2 bg-[#333C43] hover:bg-[#3E474F] text-[#B6C2CF] py-2 rounded-[3px] text-sm font-medium transition">
                    Habilitar el modo apto para daltónicos
                </button>
          </div>
      )}

    </div>
  )
}