
export default function Loader({ text = 'Cargando...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 bg-[#0079bf] rounded-lg flex items-start justify-center p-2 gap-1.5 shadow-lg animate-pulse">
        <div className="w-3 h-7 bg-white rounded-[2px]"></div>
        <div className="w-3 h-5 bg-white rounded-[2px]"></div>
      </div>
      
      {text && (
        <p className="text-[#9FADBC] text-sm font-medium animate-pulse">
            {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-[#1D2125] flex items-center justify-center">
        {content}
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center py-16">
      {content}
    </div>
  )
}