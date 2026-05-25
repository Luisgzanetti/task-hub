import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Estudar Cálculo",
            description: ".....................................................................................",
            category: "Em progresso",
            createdAt: "2025-05-23T00:00:00",
            dueDate: {
                date: "2025-06-05",
                time: "23:59:59"
            }
        },
        {
            id: 2,
            name: "Lavar louça",
            category: "Concluída",
            createdAt: "2025-05-20T00:00:00",
            dueDate: {
                date: "2025-05-25",
                time: "23:59:59"
            }
        },
        {
            id: 3,
            name: "Pagar contas",
            category: "Atrasada",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 4,
            name: "Pagar contas",
            category: "Em progresso",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 5,
            name: "Pagar contas",
            category: "Concluída",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 6,
            name: "Pagar contas",
            category: "Atrasada",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 7,
            name: "Pagar contas",
            category: "Em progresso",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 8,
            name: "Pagar contas",
            category: "Concluída",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 9,
            name: "Pagar contas",
            category: "Atrasada",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 10,
            name: "Pagar contas",
            category: "Concluída",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 11,
            name: "Pagar contas",
            category: "Em progresso",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
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