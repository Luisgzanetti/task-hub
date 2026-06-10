import { createContext, useState, useContext, useEffect } from "react";
import { buscarTarefas } from "../services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const idUsuario = 1;

    const carregarTarefas = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await buscarTarefas(idUsuario);
            setTasks(data);
        } catch (err) {
            console.error("Erro ao buscar tarefas do backend:", err);
            setError(err.message || "Não foi possível carregar as tarefas.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    return (
        <AppContext.Provider value={{ tasks, setTasks, carregarTarefas, isLoading, error }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}