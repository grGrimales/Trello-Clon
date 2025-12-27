import { create } from 'zustand'

export const useActiveBoardStore = create((set, get) => ({
  board: null,
  lists: [],
  loading: false,
  error: null,


  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  setBoardData: (board, lists) => set({ 
    board, 
    lists, 
    loading: false, 
    error: null 
  }),

  addListToState: (newList) => set((state) => ({ 
    lists: [...state.lists, newList] 
  })),

  addCardToState: (listId, newCard) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId 
        ? { ...list, cards: [...(list.cards || []), newCard] } 
        : list
    )
  })),


  deleteCardFromState: (listId, cardId) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId
        ? { ...list, cards: list.cards.filter(c => c.id !== cardId) } 
        : list
    )
  })),
  
  moveCard: (result) => set((state) => {
      const { source, destination } = result;

      if (!destination) return state;

      const newLists = state.lists.map(list => ({
        ...list,
        cards: [...list.cards] 
      }));

      const sourceList = newLists.find(list => list.id.toString() === source.droppableId);
      const destList = newLists.find(list => list.id.toString() === destination.droppableId);

      if (!sourceList || !destList) return state;

      const [movedCard] = sourceList.cards.splice(source.index, 1);

      const updatedCard = { ...movedCard, list_id: destList.id };

      destList.cards.splice(destination.index, 0, updatedCard);

      return { lists: newLists };

    }),
  
  updateCardInState: (listId, cardId, newTitle) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId
        ? { 
            ...list, 
            cards: list.cards.map(c => c.id === cardId ? { ...c, title: newTitle } : c)
          }
        : list
    )
  })),
  
  moveList: (fromIndex, toIndex) => set((state) => {
    const newLists = [...state.lists] 
    const [movedList] = newLists.splice(fromIndex, 1) 
    newLists.splice(toIndex, 0, movedList) 
    
    return { lists: newLists }
  }),

  reset: () => set({ board: null, lists: [], loading: false, error: null }),


  updateListTitleInState: (listId, newTitle) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId ? { ...list, title: newTitle } : list
    )
  })),

  updateCardDescriptionInState: (listId, cardId, description) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId
        ? { 
            ...list, 
            cards: list.cards.map(c => c.id === cardId ? { ...c, description } : c)
          }
        : list
    )
  })),

  addCommentToState: (listId, cardId, comment) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId 
      ? {
          ...list,
          cards: list.cards.map((card) => 
            card.id === cardId
            ? { ...card, comments: [comment, ...(card.comments || [])] } 
            : card
          )
        }
      : list
    )
  })),

  addActivityToState: (listId, cardId, activity) => set((state) => ({
    lists: state.lists.map((list) => 
      list.id === listId 
      ? {
          ...list,
          cards: list.cards.map((card) => 
            card.id === cardId
            ? { ...card, activities: [activity, ...(card.activities || [])] } 
            : card
          )
        }
      : list
    )
  })),
  
}))