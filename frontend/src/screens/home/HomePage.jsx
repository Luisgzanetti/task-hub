import './HomePage.css';
import { BiSortAlt2 } from "react-icons/bi";
import TopBar from "../../components/TopBar/TopBar.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import TaskCard from '../../components/TaskCard/TaskCard.jsx';
import DeleteConfirmCard from '../../components/DeleteConfirmCard/DeleteConfirmCard.jsx';
import FilterCard from '../../components/FilterCard/FilterCard.jsx';
import { useState } from "react"
import { useApp } from '../../context/AppContext.jsx';

export default function HomePage({ setPagina, setSelectedTaskId }) {

    const { tasks, setTasks } = useApp()
    const [search, setSearch] = useState("")
    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const [showFilterOverlay, setShowFilterOverlay] = useState(false)
    const [showOverdue, setShowOverdue] = useState(true)
    const [showOngoing, setShowOngoing] = useState(true)
    const [showCompleted, setShowCompleted] = useState(true)

    function handleChangeSearch(event) {
        setSearch(event.target.value)
    }

    function completeTask(id) {
        setTasks(tasks.map(task => {
            if (task.id == id) {
                if (task.category === "Concluída") {
                    return { ...task, category: "Em progresso" }
                } else {
                    return { ...task, category: "Concluída" }
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
                <BiSortAlt2 size={34} onClick={() => setShowFilterOverlay(true)} />
            </div>
            <div className='tasks-display'>
                {showOverdue && (
                    <div className='category-tasks'>
                        <p className='category-title'>Atrasadas ({tasks.filter(task => task.category === 'Atrasada').length})</p>
                        {filteredTasks.map(task => (
                            task.category === 'Atrasada' && (
                                <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} setPagina={setPagina} setSelectedTaskId={setSelectedTaskId} />
                            )
                        ))}
                    </div>
                )}
                {showOngoing && (
                    <div className='category-tasks'>
                        <p className='category-title'>Em Andamento ({tasks.filter(task => task.category === 'Em progresso').length})</p>
                        {filteredTasks.map(task => (
                            task.category === 'Em progresso' && (
                                <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} setPagina={setPagina} setSelectedTaskId={setSelectedTaskId} />
                            )
                        ))}
                    </div>
                )}
                {showCompleted && (
                    <div className='category-tasks'>
                        <p className='category-title'>Concluídas ({tasks.filter(task => task.category === 'Concluída').length})</p>
                        {filteredTasks.map(task => (
                            task.category === 'Concluída' && (
                                <TaskCard task={task} key={task.id} completeTask={completeTask} deleteTask={setDeleteTaskId} setPagina={setPagina} setSelectedTaskId={setSelectedTaskId} />
                            )
                        ))}
                    </div>
                )}
            </div>
            <SideBar
                paginaAtual="home"
                setPagina={setPagina}
            />
            {deleteTaskId && <DeleteConfirmCard deleteId={deleteTaskId} deleteTask={deleteTask} setDeleteId={setDeleteTaskId} />}
            {showFilterOverlay && <FilterCard setShowFilterOverlay={setShowFilterOverlay} showOverdue={showOverdue} setShowOverdue={setShowOverdue} showOngoing={showOngoing} setShowOngoing={setShowOngoing} showCompleted={showCompleted} setShowCompleted={setShowCompleted} />}
        </div>
    )
}