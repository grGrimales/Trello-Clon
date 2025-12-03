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
    reset,
    addCardToState,
    deleteCardFromState
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

  const createCard = async (listId, title) => {
    const currentList = lists.find(l => l.id === listId)
    const newPosition = currentList?.cards?.length || 0

    const { data, error } = await supabase
      .from('cards')
      .insert([{ 
        title, 
        list_id: listId, 
        position: newPosition 
      }])
      .select()

    if (data) {
      addCardToState(listId, data[0])
      return true
    }
    return false
  }

  const saveCardOrder = async (listId, newCards) => {
    const updates = newCards.map((card, index) => ({
      id: card.id,
      title: card.title,        
      list_id: listId,          
      position: index,         
    }))

    const { error } = await supabase
      .from('cards')
      .upsert(updates) 

    if (error) {
      console.error("Error guardando orden:", error)
      // TODO toast de error
    }
  }


  const deleteCard = async (listId, cardId) => {
    deleteCardFromState(listId, cardId)

    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', cardId)

    if (error) {
      console.error("Error borrando tarjeta:", error)
      alert("Hubo un error borrando la tarjeta")
    }
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
    createList,
    createCard,
    saveCardOrder,
    deleteCard
  }
}