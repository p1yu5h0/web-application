export function InputBox({label, placeholder, onChange, type}) {
    return <div>
      <div className="fw-medium fs-4 text-left py-2 px-4 m-1">
        {label}
      </div>
      <input onChange={onChange} type={type} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}