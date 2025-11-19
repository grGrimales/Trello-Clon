import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth' 
import Input from '../components/Input'
import Button from '../components/Button'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [msg, setMsg] = useState(null)
  
  const { register, loading, error } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setMsg(null)

    const { success } = await register(formData.email, formData.password, formData.fullName)

    if (success) {
      setMsg("¡Registro exitoso! Revisa tu correo o inicia sesión.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F9FAFC] sm:bg-[#1D2125]">
      <div className="auth-container">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">TrelloClone</h1>
          <p className="text-sm text-gray-400">Crea tu cuenta gratis</p>
        </div>

        {error && <div className="p-3 text-sm text-red-200 bg-red-900/50 border border-red-800 rounded">{error}</div>}
        {msg && <div className="p-3 text-sm text-green-200 bg-green-900/50 border border-green-800 rounded">{msg}</div>}

        <form onSubmit={handleRegister} className="space-y-2">
          <Input
            label="Nombre Completo"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <Button type="submit" loading={loading}>
            Registrarse
          </Button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-4">
          ¿Ya tienes cuenta? <Link to="/login" className="link-text">Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}