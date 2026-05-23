import { useState } from "react"

import LoginPage from "./screens/login/LoginPage"
import HomePage from "./screens/home/HomePage"
import Lixo from "./screens/lixo/Lixo"
import Notification from "./screens/notifications/noti"

export default function App() {

    const [pagina, setPagina] = useState("login")

    if (pagina === "notification") {
        return <Notification setPagina={setPagina} />       
    }

    if (pagina === "login") {
        return <LoginPage setPagina={setPagina} />
    }

    if (pagina === "lixo") {
        return <Lixo setPagina={setPagina} />
    }

    if (pagina === "home") {
        return <HomePage setPagina={setPagina} />
    }
}