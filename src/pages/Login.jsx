import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth' 
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { login, loading, error } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password) 
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F9FAFC] sm:bg-[#1D2125]">
      <div className="auth-container">
        
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
          ¿No tienes cuenta? <Link to="/register" className="link-text">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  )
}