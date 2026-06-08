import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Estudar Cálculo",
            description: "Revisar derivadas, integrais e limites.",
            category: "Em progresso",
            createdAt: "2025-05-23T00:00:00",
            dueDate: {
                date: "2025-06-05",
                time: "23:59:59"
            },
            deleted: false
        },
        {
            id: 2,
            name: "Lavar o carro",
            description: "Levar o carro ao lava-jato e lavar por dentro e por fora.",
            category: "Concluída",
            createdAt: "2025-05-20T00:00:00",
            dueDate: {
                date: "2025-05-25",
                time: "23:59:59"
            },
            deleted: false
        },
        {
            id: 3,
            name: "Pagar contas",
            description: "Pagar as contas de água, luz e internet.",
            category: "Atrasada",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            },
            deleted: false
        },
        {
            id: 4,
            name: "limpar o quarto",
            description: "limpar o quarto e arrumar a cama",
            category: "Em progresso",
            createdAt: "2025-05-26T00:00:00",
            dueDate: {
                date: "2025-05-26",
                time: "23:59:59"
            },
            deleted: true
        }
    ])

    return (
        <AppContext.Provider value={{ tasks, setTasks }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}