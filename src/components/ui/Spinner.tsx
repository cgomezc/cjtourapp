interface SpinnerProps {
  label?: string
}

export function Spinner({ label = 'Cargando…' }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-gray-500">
      <div
        role="status"
        aria-label={label}
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600"
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}
