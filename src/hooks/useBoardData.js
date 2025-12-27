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
    deleteCardFromState,
    updateCardInState,
    moveList,
    updateListTitleInState,
    updateCardDescriptionInState,
    addCommentToState
  } = useActiveBoardStore()

 const fetchAllData = async () => {
    if (!boardId) return
    setLoading(true)

    try {
      const [boardRes, listsRes] = await Promise.all([
        supabase.from('boards').select('*').eq('id', boardId).single(),
        supabase
          .from('lists')
          .select(`
            *,
            cards (
              *,
              comments (*)
            )
          `)
          .eq('board_id', boardId)
          .order('position', { ascending: true })
          .order('created_at', { foreignTable: 'cards.comments', ascending: false })
      ])

      if (boardRes.error) throw boardRes.error
      if (listsRes.error) throw listsRes.error

      const sortedLists = listsRes.data.map(list => ({
        ...list,
        cards: list.cards?.sort((a, b) => a.position - b.position) || []
      }))

      setBoardData(boardRes.data, sortedLists)

    } catch (err) {
      console.error("Error:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

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


const updateCard = async (listId, cardId, newTitle) => {
    updateCardInState(listId, cardId, newTitle)

    const { error } = await supabase
      .from('cards')
      .update({ title: newTitle })
      .eq('id', cardId)

    if (error) {
      console.error("Error actualizando tarjeta:", error)
    }
  }

  const saveListOrder = async (newLists) => {
    const updates = newLists.map((list, index) => ({
      id: list.id,
      board_id: boardId,
      title: list.title,
      position: index
    }))

    const { error } = await supabase
      .from('lists')
      .upsert(updates)

    if (error) console.error("Error guardando orden de listas:", error)
  }

  const updateListTitle = async (listId, newTitle) => {
    updateListTitleInState(listId, newTitle)

    const { error } = await supabase
      .from('lists')
      .update({ title: newTitle })
      .eq('id', listId)

    if (error) {
      console.error("Error al actualizar lista:", error)
    }
  }

  const updateCardDescription = async (listId, cardId, description) => {
      updateCardDescriptionInState(listId, cardId, description)

      const { error } = await supabase
        .from('cards')
        .update({ description }) 
        .eq('id', cardId)

      if (error) {
        console.error("Error guardando descripción:", error)
      }
    }

   const addComment = async (listId, cardId, text) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return 

    const newComment = {
      id: Date.now(),
      card_id: cardId,
      user_id: user.id,
      user_email: user.email,
      content: text,
      created_at: new Date().toISOString()
    }

    addCommentToState(listId, cardId, newComment) 

    const { error } = await supabase
      .from('comments')
      .insert({
        card_id: cardId,
        user_id: user.id,
        user_email: user.email,
        content: text
      })

    if (error) {
      console.error("Error al comentar:", error)
    }
  }

  return { 
    board, 
    lists, 
    loading, 
    error, 
    createList,
    createCard,
    saveCardOrder,
    deleteCard,
    updateCard,
    saveListOrder,
    updateListTitle,
    updateCardDescription,
    addComment
  }
}