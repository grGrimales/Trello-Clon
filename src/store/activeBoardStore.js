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
  
  reset: () => set({ board: null, lists: [], loading: false, error: null })
}))