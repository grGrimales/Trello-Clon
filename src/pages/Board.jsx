import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import Navbar from '../components/Navbar'

export default function Board() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return <div className="text-center mt-10 text-gray-500">Cargando...</div>

  return (
    <div className="min-h-screen bg-[#1D2125]">
      <Navbar user={user} />

      <main className="p-8">
        <h2 className="text-white font-bold text-lg mb-4">Mis Tableros</h2>
        
        {/* Aquí irá el Grid de tableros  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Botón temporal para crear tablero */}
          <div className="h-24 bg-[#22272B] hover:bg-[#2c333a] rounded transition cursor-pointer flex items-center justify-center text-gray-400 text-sm">
             Crear tablero nuevo
          </div>

        </div>
      </main>
    </div>
  )
}