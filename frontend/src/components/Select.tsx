type Props = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }
export default function Select({label, error, children, ...rest}: Props){
  return (
    <label className="block mb-4">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <select className="input" {...rest}>{children}</select>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </label>
  )
}
