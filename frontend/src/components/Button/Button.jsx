import './Button.css';

export default function Button({ onClick, label }) {

    return (
        <button className="custom-button" onClick={onClick}>
            {label}
        </button>
    )
}