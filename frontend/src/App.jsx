import { useState } from "react"
import { AppProvider } from "./context/AppContext";
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
        return (
            <AppProvider>
                <Inicio setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "cadastro") {
        return (
            <AppProvider>
                <Cadastro setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "notification") {
        return (
            <AppProvider>
                <Notification setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "login") {
        return (
            <AppProvider>
                <LoginPage setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "lixo") {
        return (
            <AppProvider>
                <Lixo setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "home") {
        return (
            <AppProvider>
                <HomePage setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "recuperar") {
        return (
            <AppProvider>
                <RecuperarSenha setPagina={setPagina} />
            </AppProvider>
        )
    }

    if (pagina === "user") {
        return (
            <AppProvider>
                <User setPagina={setPagina} />
            </AppProvider>
        )
    }
}