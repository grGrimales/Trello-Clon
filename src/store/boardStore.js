import { create } from 'zustand'

export const useBoardStore = create((set) => ({
  boards: [],
  isLoading: false,
  
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
  setLoading: (loading) => set({ isLoading: loading }),
}))