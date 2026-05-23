import './HomePage.css';
import { BiSortAlt2 } from "react-icons/bi";
import TopBar from "../../components/TopBar/TopBar.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import DeleteConfirmCard from '../../components/DeleteConfirmCard/DeleteConfirmCard.jsx';
import Notification from "../notifications/noti.jsx"
import lixo from "../lixo/lixo.jsx"
import { useState } from "react"

export default function HomePage({ setPagina }) {

    const [search, setSearch] = useState("")
    const [deleteTaskId, setDeleteTaskId] = useState(null)

    function handleChangeSearch(event) {
        setSearch(event.target.value)
    }

    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Estudar Cálculo",
            description: ".....................................................................................",
            category: "in_progress",
            createdAt: "2025-05-23T00:00:00",
            dueDate: {
                date: "2025-06-05",
                time: "23:59:59"
            }
        },
        {
            id: 2,
            name: "Lavar louça",
            category: "completed",
            createdAt: "2025-05-20T00:00:00",
            dueDate: {
                date: "2025-05-25",
                time: "23:59:59"
            }
        },
        {
            id: 3,
            name: "Pagar contas",
            category: "overdue",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 4,
            name: "Pagar contas",
            category: "in_progress",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 5,
            name: "Pagar contas",
            category: "completed",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 6,
            name: "Pagar contas",
            category: "overdue",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 7,
            name: "Pagar contas",
            category: "in_progress",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 8,
            name: "Pagar contas",
            category: "completed",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 9,
            name: "Pagar contas",
            category: "overdue",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 10,
            name: "Pagar contas",
            category: "completed",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        },
        {
            id: 11,
            name: "Pagar contas",
            category: "in_progress",
            createdAt: "2025-04-01T00:00:00",
            dueDate: {
                date: "2025-04-05",
                time: "23:59:59"
            }
        }
    ])

    function completeTask(id) {
        setTasks(tasks.map(task => {
            if (task.id == id) {
                if (task.category === "completed") {
                    return { ...task, category: "in_progress" }
                } else {
                    return { ...task, category: "completed" }
                }
            }
            return task;
        }));
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
        setDeleteTaskId(null);
    }

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="home-bg">
            <TopBar setPagina={setPagina} />
            <div className="search-position">
                <SearchBar
                    search={search}
                    handleChangeSearch={handleChangeSearch}
                />
            </div>
            <div className='total-tasks-display'>
                <p className='total-tasks-text'>Minhas Tarefas ({tasks.length})</p>
                <BiSortAlt2 size={34} />
            </div>
            <div className='tasks-display'>
                <div className='category-tasks'>
                    <p className='category-title'>Em Andamento ({tasks.filter(task => task.category === 'in_progress').length})</p>
                    {filteredTasks.map(task => (
                        task.category === 'in_progress' && (
                            <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} />
                        )
                    ))}
                </div>
                <div className='category-tasks'>
                    <p className='category-title'>Concluídas ({tasks.filter(task => task.category === 'completed').length})</p>
                    {filteredTasks.map(task => (
                        task.category === 'completed' && (
                            <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} />
                        )
                    ))}
                </div>
                <div className='category-tasks'>
                    <p className='category-title'>Atrasadas ({tasks.filter(task => task.category === 'overdue').length})</p>
                    {filteredTasks.map(task => (
                        task.category === 'overdue' && (
                            <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} />
                        )
                    ))}
                </div>
            </div>
            <SideBar
                paginaAtual="home"
                setPagina={setPagina}
            />
            {deleteTaskId && <DeleteConfirmCard deleteId={deleteTaskId} deleteTask={deleteTask} setDeleteId={setDeleteTaskId} />}
        </div>
    )
}