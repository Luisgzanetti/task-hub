import './Input.css'

export default function Input({ title, placeholder, value, setValue, type = "text" }) {

    return (
        <div className="input-container">
            <p className='input-title'>{title}</p>
            <input type={type} placeholder={placeholder} className="input-text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}