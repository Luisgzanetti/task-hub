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
import EditTask from "./screens/EditTask/EditTask";
import AddTask from "./screens/AddTask/AddTask";

function AppContent() {
    const [pagina, setPagina] = useState("inicio")
    const [selectedTaskId, setSelectedTaskId] = useState(null) // Essa variável só serve para a página de editar

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
        return <HomePage setPagina={setPagina} setSelectedTaskId={setSelectedTaskId} />
    }

    if (pagina === "recuperar") {
        return <RecuperarSenha setPagina={setPagina} />
    }

    if (pagina === "user") {
        return <User setPagina={setPagina} />
    }

    if (pagina === "edit") {
        return <EditTask setPagina={setPagina} taskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId} />
    }

    if (pagina === "add") {
        return <AddTask setPagina={setPagina} />
    }

    return null;
}

export default function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    )
}