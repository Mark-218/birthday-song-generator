type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
export default function Input({label, error, ...rest}: Props){
  return (
    <label className="block mb-4">
      {label && <div className="mb-1 text-sm font-medium">{label}</div>}
      <input className="input" {...rest}/>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </label>
  )
}
