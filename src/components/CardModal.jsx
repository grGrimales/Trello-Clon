import { useState, useEffect, useRef } from 'react';
import LabelPicker from './LabelPicker';
import { Plus, Tag } from 'lucide-react';
import ActionButton from './ActionButton';



export default function CardModal({ card, listTitle, onClose, onSaveDescription, onAddComment, onToggleLabel,labelNames, onUpdateLabelName }) {
  const [description, setDescription] = useState(card.description || '');
  const [isEditingDesc, setIsEditingDesc] = useState(false)
  const textareaRef = useRef(null);

  const [showLabelPicker, setShowLabelPicker] = useState(false);

  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    setDescription(card.description || '')
  }, [card.description])

  useEffect(() => {
    if (isEditingDesc && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditingDesc])

  const handleSave = () => {
    if (description !== card.description) {
      onSaveDescription(card.list_id, card.id, description)
    }
    setIsEditingDesc(false)
  }

  const handleSendComment = () => {
    if (!commentText.trim()) return
    onAddComment(commentText)
    setCommentText('') 
  }


  const activityFeed = [
    ...(card.comments || []).map(c => ({ ...c, type: 'comment' })),
    ...(card.activities || []).map(a => ({ ...a, type: 'activity' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 


  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-4"
      onMouseDown={onClose}
    >
    
      <div 
        className="bg-[#323940] w-full max-w-[1000px] h-[80vh] shadow-2xl text-[#B6C2CF] flex flex-col relative border border-gray-600 rounded-xl"
        onMouseDown={(e) => e.stopPropagation()} 
      >
        
        {/* BARRA SUPERIOR */}
        <div className="h-14 bg-[#323940] flex items-center justify-between px-6 border-b border-gray-700/50 shrink-0 border-t rounded-t-xl">
             <div className="flex items-center gap-3 text-sm text-[#9FADBC]">
                <span className="text-lg">🗂️</span>
                <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold uppercase">En la lista</span>
                    <span className="font-bold text-[#B6C2CF] text-sm">{listTitle}</span>
                </div>
             </div>
             <button onClick={onClose} className="cursor-pointer text-[#9FADBC] hover:text-white p-2 hover:bg-white/10 rounded-full transition">✕</button>
        </div>

        {/* CONTENIDO PRINCIPAL*/}
     
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2   overflow-hidden">
          
          {/* =========================================================
              COLUMNA IZQUIERDA 
             ========================================================= */}
          <div className="p-8 overflow-y-auto custom-scrollbar border-r border-gray-700/30">
            
            {/* TÍTULO */}
            <h2 className="text-2xl font-bold text-[#B6C2CF] mb-6 leading-tight">{card.title}</h2>
            {/* === SECCIÓN DE ETIQUETAS SELECCIONADAS === */}
            {(card.labels && card.labels.length > 0) && (
                <div className="mb-6 ml-10"> 
                    <h3 className="text-xs font-semibold text-[#9FADBC] uppercase mb-2">Etiquetas</h3>
                    <div className="flex flex-wrap gap-1">
                        {card.labels.map(color => (
                            <div 
                                key={color} 
                                className="h-8 min-w-[48px] px-3 rounded-[3px] hover:brightness-110 cursor-pointer transition flex items-center justify-center font-bold text-[#1D2125] text-xs"
                                style={{ backgroundColor: color }}
                            >
                              {labelNames ? labelNames[color] : ''}
                            </div>
                        ))}
                        
                        <button 
                            onClick={() => setShowLabelPicker(true)}
                            className="cursor-pointer h-8 w-8 bg-[#3A424A] hover:bg-[#4A535C] rounded-[3px] text-[#B6C2CF] flex items-center justify-center transition"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            {/* FILA DE ACCIONES */}
            <div className="flex flex-wrap gap-2 mb-8">
                <ActionButton icon={<Plus size={16} />} label="Añadir" />
              <div className="relative"> 
                  
                  <ActionButton 
                      icon={<Tag size={16}/>} 
                      label="Etiquetas" 
                      onClick={() => setShowLabelPicker(!showLabelPicker)}
                  />

                  {showLabelPicker && (
                      <LabelPicker 
                          selectedLabels={card.labels || []}
                          labelNames={labelNames || {}}
                          onToggleLabel={(color) => onToggleLabel && onToggleLabel(card.list_id, card.id, color)}
                          onUpdateLabelName={onUpdateLabelName}
                          onClose={() => setShowLabelPicker(false)}
                        />
                  )}
              </div>
                <ActionButton icon="☑️" label="Checklist" />
                <ActionButton icon="📎" label="Adjunto" />
            </div>

            {/* MIEMBROS (Visible por defecto) */}
            <div className="mb-8">
                <h3 className="text-xs font-semibold text-[#9FADBC] uppercase mb-2">Miembros</h3>
                <div className="flex gap-2 items-center">
                     <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 cursor-pointer shadow-sm border border-[#323940]" title="Tú">
                        YO
                     </div>
                     <button className="cursor-pointer w-8 h-8 rounded-full bg-[#3A424A] hover:bg-[#4A535C] text-[#9FADBC] flex items-center justify-center transition">
                        +
                     </button>
                </div>
            </div>


            {/* SECCIÓN DESCRIPCIÓN */}
            <div>
               <div className="flex items-center gap-3 mb-3">
                   <span className="text-[#9FADBC] text-xl">≡</span>
                   <h3 className="font-semibold text-lg text-[#B6C2CF]">Descripción</h3>
               </div>
               
               {isEditingDesc ? (
                  <div className="space-y-2">
                    <textarea
                      ref={textareaRef}
                      className="w-full h-40 bg-[#22272B] text-[#B6C2CF] p-4 rounded-[3px] border border-blue-500 outline-none resize-none text-sm leading-relaxed"
                      placeholder="Añadir una descripción más detallada..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSave} className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-[3px] font-medium text-sm">Guardar</button>
                        <button onClick={() => setIsEditingDesc(false)} className="cursor-pointer text-[#9FADBC] hover:text-white px-3 py-1.5 text-sm">Cancelar</button>
                    </div>
                  </div>
               ) : (
                  <div 
                    onClick={() => setIsEditingDesc(true)}
                    className="cursor-pointer w-full min-h-[100px] bg-[#22272B] hover:bg-[#2A3036] border border-gray-700/50 hover:border-gray-600 rounded-[4px] p-4 text-sm text-[#B6C2CF] transition whitespace-pre-wrap leading-relaxed"
                  >
                    {description || <span className="text-[#9FADBC]">Añadir una descripción más detallada...</span>}
                  </div>
               )}
            </div>

          </div>

          {/* =========================================================
              COLUMNA DERECHA 
             ========================================================= */}
          <div className=" overflow-hidden bg-[#1D2125] p-6 overflow-y-auto custom-scrollbar flex flex-col border-l border-[#1D2125] border-l border-[#1D2125] rounded-br-xl" >
             
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#B6C2CF] flex items-center gap-2">
                    <span>💬</span> Comentarios y Actividad
                </h3>
                <button className=" cursor-pointer text-xs bg-[#3A424A] hover:bg-[#4A535C] px-2 py-1 rounded text-[#B6C2CF]">Mostrar detalles</button>
             </div>

             {/* Input de Comentario */}
             <div className="mb-6 relative group">
                 <input 
                    className="w-full bg-[#22272B] border border-gray-700/50 rounded-[4px] py-2.5 px-3 text-sm text-[#B6C2CF] placeholder-[#9FADBC] outline-none focus:border-blue-500 transition h-11"
                    placeholder="Escribe un comentario..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment()} 
                 />
             </div>

             {/* Placeholder de Actividad */}
             
            {/* LISTA DE ACTIVIDAD MEZCLADA */}
             <div className="space-y-6 flex-1 mt-6 overflow-hidden">
                 
                 {activityFeed.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start animate-fadeIn overflow-hidden">
                        
                        {/* AVATAR */}
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5 uppercase">
                            {item.user_email ? item.user_email[0] : 'S'}
                        </div>

                        {/* CONTENIDO */}
                        <div className="w-full">
                            <div className="flex gap-2 items-baseline">
                                <span className="font-bold text-[#B6C2CF] text-sm">
                                  {item.user_email?.split('@')[0]}
                                </span>
                                <span className="text-xs text-[#9FADBC]">
                                  {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>

                            {/* SI ES UN COMENTARIO */}
                            {item.type === 'comment' ? (
                                <div className="bg-[#22272B] p-3 rounded-[3px] mt-1 text-sm text-[#B6C2CF] border border-gray-700/30 shadow-sm">
                                    {item.content}
                                </div>
                            ) : (
                                <div className="text-sm text-[#B6C2CF] mt-0.5">
                                   {item.content}
                                </div>
                            )}
                        </div>
                    </div>
                 ))}

                 {activityFeed.length === 0 && (
                    <p className="text-xs text-[#9FADBC] text-center italic mt-4">Sin actividad reciente.</p>
                 )}

             </div>
          </div>

        </div>
      </div>
    </div>
  )
}