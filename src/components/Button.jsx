export default function Button({ children, loading, className = "", ...props }) {
  return (
    <button
      disabled={loading}
      className={`btn-primary cursor-pointer ${className}`}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  )
}