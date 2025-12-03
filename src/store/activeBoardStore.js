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

    // Si no hay destino (la soltaron fuera), no hacemos nada
    if (!destination) return state;

    const newLists = state.lists.map(list => ({
      ...list,
      cards: [...list.cards] 
    }));
    // 1. Encontrar lista de origen y destino
    const sourceList = newLists.find(list => list.id.toString() === source.droppableId);
    const destList = newLists.find(list => list.id.toString() === destination.droppableId);

    if (!sourceList || !destList) return state;

    // 2. Sacar la tarjeta de la lista de origen
    const [movedCard] = sourceList.cards.splice(source.index, 1);

    // 3. Ponerla en la lista de destino en la nueva posición
    destList.cards.splice(destination.index, 0, movedCard);

    // TODO: Aquí  llamaremos a Supabase para guardar el cambio de posición

    return { lists: newLists };
  }),
  
  reset: () => set({ board: null, lists: [], loading: false, error: null })
}))