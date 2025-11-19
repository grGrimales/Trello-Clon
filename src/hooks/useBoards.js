import { supabase } from '../supabaseClient'
import { useBoardStore } from '../store/boardStore'
import { useAuthStore } from '../store/authStore'

export function useBoards() {
  const { boards, isLoading, setBoards, addBoard, setLoading } = useBoardStore()
  const { user } = useAuthStore()

  const fetchBoards = async () => {
    if (!user) return
    setLoading(true)
    
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error cargando tableros:', error)
    } else {
      setBoards(data)
    }
    setLoading(false)
  }

  const createBoard = async (title, color = 'bg-blue-600') => {
    if (!user) return { success: false, error: 'No usuario' }
    
    const newBoard = {
      title,
      background: color, 
      owner_id: user.id,
    }

    const { data, error } = await supabase
      .from('boards')
      .insert([newBoard])
      .select()

    if (error) return { success: false, error: error.message }

    if (data && data.length > 0) {
      addBoard(data[0]) 
      return { success: true }
    }
  }

  return {
    boards,
    isLoading,
    fetchBoards,
    createBoard
  }
}