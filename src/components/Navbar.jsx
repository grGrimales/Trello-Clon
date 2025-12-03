import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ user }) {
const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getInitials = (name) => {
    if (!name) return 'U' 
    const parts = name.split(' ')
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
  }

  const userName = user?.user_metadata?.full_name || 'Usuario'
  const initials = getInitials(userName)

  return (
    //Poder redirigir a la pagina principal al dar click en el logo
    <nav className="flex items-center justify-between px-4 py-2 bg-[#1D2125] border-b border-gray-700">
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-xl cursor-pointer">
          <span className="p-1 bg-blue-600 rounded text-white text-xs">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v4zm7 4c0 .55-.45 1-1 1h-5c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v8z"/>
            </svg>
          </span>
          TrelloClone
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-500 transition"
          title={userName}
        >
          {initials}
        </div>

        <button 
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Salir
        </button>
      </div>
    </nav>
  )
}