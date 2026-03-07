import { useState } from 'react'

export default function ShareModal({ board, currentUser, onClose, onInvite }) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const getNameFromEmail = (email) => email?.split('@')[0] || 'Usuario'
  const getHandleFromEmail = (email) => '@' + (email?.split('@')[0] || 'usuario')

  const handleInviteClick = async () => {
    if (!email.trim() || !email.includes('@')) {
        setMessage({ type: 'error', text: 'Email inválido.' })
        return
    }
    setIsLoading(true)
    setMessage(null)

    const result = await onInvite(email.trim().toLowerCase())

    setIsLoading(false)
    setMessage({ 
        type: result.success ? 'success' : 'error', 
        text: result.message 
    })
    if (result.success) setEmail('')
  }

  const allMembers = [];

  allMembers.push({
      email: board?.isOwner ? currentUser?.email : (board?.owner_email || 'Administrador Principal'),
      role: 'Administrador',
      isMe: board?.isOwner
  });

  if (board?.members) {
      board.members.forEach(member => {
          if (member.id !== board.owner_id) {
              allMembers.push({
                  email: member.email,
                  role: member.role || 'Miembro',
                  isMe: member.email === currentUser?.email
              });
          }
      });
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] animate-fadeIn"
      onMouseDown={onClose}
    >
      <div 
        className="bg-[#282E33] w-full max-w-[580px] rounded-lg shadow-2xl text-[#B6C2CF] relative overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-normal text-white">Compartir tablero</h2>
            <button onClick={onClose} className="cursor-pointer text-[#9FADBC] hover:text-white transition">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div className="px-6 pb-6">
            
            <div className="flex gap-2 mb-2">
                <div className="flex-1 flex gap-0">
                    <input 
                        type="email"
                        placeholder="Dirección de correo electrónico o nombre"
                        className="w-full bg-[#22272B] border border-[#A6C5E2]/30 focus:border-[#579DFF] rounded-l-[3px] px-3 py-2 text-sm text-[#B6C2CF] outline-none transition placeholder-[#9FADBC]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleInviteClick()}
                    />
                    <div className="bg-[#22272B] border-y border-r border-[#A6C5E2]/30 px-3 flex items-center rounded-r-[3px] cursor-pointer hover:bg-[#A6C5E2]/10">
                        <span className="text-xs font-semibold text-[#B6C2CF]">Miembro</span>
                        <span className="text-[10px] ml-1">▼</span>
                    </div>
                </div>
                
                <button 
                    onClick={handleInviteClick}
                    disabled={isLoading || !email}
                    className="cursor-pointer bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] px-4 py-2 rounded-[3px] text-sm font-semibold transition disabled:opacity-50"
                >
                    {isLoading ? '...' : 'Compartir'}
                </button>
            </div>
            
            {message && (
                <p className={`text-xs mb-4 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {message.text}
                </p>
            )}

            <div className="flex items-start gap-3 mt-6 mb-6">
                 <div className="bg-[#22272B] p-2 rounded-[3px]">
                    <span className="text-[#9FADBC] text-lg">🔗</span>
                 </div>
                 <div>
                     <p className="text-sm text-[#B6C2CF]">Comparte este tablero con un enlace</p>
                     <button className="text-sm text-[#579DFF] hover:underline">Crear enlace</button>
                 </div>
            </div>

            <div>
                <div className="border-b border-gray-700/50 flex mb-4">
                    <div className="border-b-2 border-[#579DFF] pb-2 pr-4 cursor-pointer">
                        <span className="text-sm font-semibold text-[#579DFF]">Miembros del tablero</span>
                        <span className="bg-[#2C333A] text-[#B6C2CF] text-xs px-1.5 py-0.5 rounded ml-2 border border-gray-700">
                           {allMembers.length}
                        </span>
                    </div>
                </div>

                <div className="space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
                    
                    {allMembers.map((member, index) => {
                        const isOwner = member.role === 'Administrador';
                        const initial = member.email.includes('@') ? getNameFromEmail(member.email).substring(0, 2) : 'AD';

                        return (
                            <div key={index} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase ${member.isMe ? 'bg-[#579DFF] text-[#1D2125]' : (isOwner ? 'bg-yellow-600' : 'bg-gray-500')}`}>
                                        {initial}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-[#B6C2CF]">
                                                {member.email.includes('@') ? getNameFromEmail(member.email) : member.email}
                                            </span>
                                            {member.isMe && <span className="text-sm text-[#B6C2CF] font-normal">(tú)</span>}
                                        </div>
                                        <p className="text-xs text-[#9FADBC]">
                                            {member.email.includes('@') ? getHandleFromEmail(member.email) : 'Dueño original'} • {member.role}
                                        </p>
                                    </div>
                                </div>
                                
                                <button className={`cursor-pointer px-3 py-1.5 rounded-[3px] text-sm text-[#B6C2CF] flex items-center gap-2 transition ${member.isMe ? 'bg-[#22272B] hover:bg-[#A6C5E2]/10' : 'hover:bg-[#22272B]'}`}>
                                     {member.role}
                                     {member.isMe && <span className="text-[10px]">▼</span>}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}