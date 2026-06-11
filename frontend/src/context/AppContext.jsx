import { createContext, useState, useContext, useEffect } from "react";
import { buscarTarefas } from "../services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState(() => {
        const cached = localStorage.getItem("usuario");
        return cached ? JSON.parse(cached) : null;
    });

    const carregarTarefas = async (userId) => {
        const idToFetch = userId || usuario?.id_usuario;
        if (!idToFetch) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await buscarTarefas(idToFetch);
            setTasks(data);
        } catch (err) {
            console.error("Erro ao buscar tarefas do backend:", err);
            setError(err.message || "Não foi possível carregar as tarefas.");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        setTasks([]);
    };

    const loginUser = (userData) => {
        localStorage.setItem("usuario", JSON.stringify(userData));
        setUsuario(userData);
    };

    useEffect(() => {
        if (usuario) {
            carregarTarefas();
        } else {
            setTasks([]);
        }
    }, [usuario]);

    return (
        <AppContext.Provider value={{ tasks, setTasks, carregarTarefas, isLoading, error, usuario, loginUser, logout }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}