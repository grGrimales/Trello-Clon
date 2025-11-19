import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F9FAFC] sm:bg-[#1D2125]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1D2125] sm:border sm:border-gray-700 sm:shadow-2xl rounded-xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">TrelloClone</h1>
          <p className="text-sm text-gray-400">Bienvenido de nuevo</p>
        </div>

        {error && <div className="p-3 text-sm text-red-200 bg-red-900/50 border border-red-800 rounded">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-2">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" loading={loading}>
            Entrar
          </Button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-4">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-400 hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  )
}