import { useState } from "react"

import LoginPage from "./screens/login/LoginPage"
import HomePage from "./screens/home/HomePage"
import Lixo from "./screens/lixo/lixo";
import Notification from "./screens/notifications/noti"
import Inicio from "./screens/inicio/Inicio" 
import Cadastro from "./screens/cadastro/Cadastro"
import RecuperarSenha from "./screens/recuperar-senha/Recuperar";
import User from "./screens/usuario/Usuario"

export default function App() {

    const [pagina, setPagina] = useState("inicio")

    if (pagina === "inicio") {
        return <Inicio setPagina={setPagina} />
    }

    if (pagina === "cadastro") {
        return <Cadastro setPagina={setPagina} />
    }

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

    if (pagina === "recuperar") {
        return <RecuperarSenha setPagina={setPagina} />
    }
    
    if (pagina === "user") {
        return <User setPagina={setPagina} />
    }
}