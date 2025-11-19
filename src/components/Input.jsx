export default function Input({ label, className = "", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="label-text">
          {label}
        </label>
      )}
      <input
        className={`input-primary ${className}`}
        {...props} 
      />
    </div>
  )
}