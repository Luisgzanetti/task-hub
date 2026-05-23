import { useState } from "react"
import Home from "../home/HomePage"

export default function LoginPage({ setPagina }) {

    return (
        <div>
            <h1>Login Page</h1>

            <button onClick={() => setPagina("home")}>
                Entrar
            </button>
        </div>
    )
}