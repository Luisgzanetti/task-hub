import { Link } from "react-router"

export default function LoginPage() {
    return (
        <div>
            <h1>Login Page</h1>
            <button>
                <Link to="/home">Home</Link>
            </button>
        </div>
    )
}