import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

import Input from '../components/Input'
import Button from '../components/Button'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMsg(null)

    const { fullName, email, password } = formData

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, 
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMsg("¡Registro exitoso! Revisa tu correo (o inicia sesión si desactivaste la confirmación).")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#F9FAFC] sm:bg-[#1D2125]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1D2125] sm:border sm:border-gray-700 sm:shadow-2xl rounded-xl">
        
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
            type="text"
            placeholder="Ej: Juan Pérez"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
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
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}