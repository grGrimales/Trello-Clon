import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Board from './pages/Board' 
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

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
        </Routes>
      </div>
    </Router>
  )
}

export default App