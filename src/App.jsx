import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { useAuthStore } from './store/authStore' 

import Login from './pages/Login'
import Register from './pages/Register'
import Board from './pages/Board'
import BoardPage from './pages/BoardPage'
import Loader from './components/Loader'

function App() {
  const { session, loading, setSession } = useAuthStore()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setSession]) 

 if (loading) return <Loader fullScreen text="Verificando sesión..." />

  return (
    <Router>
      <div className="min-h-screen bg-[#1D2125] text-white font-sans">
        <Routes>
          <Route 
            path="/login" 
            element={!session ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!session ? <Register /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={session ? <Board /> : <Navigate to="/login" />} 
          />

          <Route 
            path="/board/:boardId" 
            element={session ? <BoardPage /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App