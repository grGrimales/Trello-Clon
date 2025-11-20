import { useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useActiveBoardStore } from '../store/activeBoardStore'

export function useBoardData(boardId) {
  const { 
    board, 
    lists, 
    loading, 
    error, 
    setLoading, 
    setBoardData, 
    setError, 
    addListToState, 
    reset 
  } = useActiveBoardStore()

  // 1. Fetch Data (Con Promise.all)
  const fetchAllData = async () => {
    if (!boardId) return
    setLoading(true)

    try {
      const [boardRes, listsRes] = await Promise.all([
        supabase.from('boards').select('*').eq('id', boardId).single(),
        supabase
          .from('lists')
          .select('*, cards (*)')
          .eq('board_id', boardId)
          .order('position', { ascending: true })
      ])

      if (boardRes.error) throw boardRes.error
      if (listsRes.error) throw listsRes.error

      // Ordenar tarjetas
      const sortedLists = listsRes.data.map(list => ({
        ...list,
        cards: list.cards?.sort((a, b) => a.position - b.position) || []
      }))

      // Guardar en Zustand
      setBoardData(boardRes.data, sortedLists)

    } catch (err) {
      console.error("Error:", err)
      setError(err)
    }
  }

  // 2. Crear Lista
  const createList = async (title) => {
    const newPosition = lists.length > 0 ? lists.length + 1 : 0
    
    const { data, error } = await supabase
      .from('lists')
      .insert([{ title, board_id: boardId, position: newPosition }])
      .select()

    if (data) {
      const newList = { ...data[0], cards: [] }
      addListToState(newList)
      return true
    }
    return false
  }

  useEffect(() => {
    fetchAllData()
    
    return () => reset() 
  }, [boardId])

  return { 
    board, 
    lists, 
    loading, 
    error, 
    createList 
  }
}