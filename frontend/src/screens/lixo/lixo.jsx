import './lixo.css'
import { useState } from "react"
import TopBar from '../../components/TopBar/TopBar'
import { useApp } from '../../context/AppContext'
import SideBar from '../../components/SideBar/SideBar'
import { BiTime } from "react-icons/bi";

export default function Lixo({ setPagina }) {

    const [mostrarModal, setMostrarModal] = useState(false)

    const [tarefaSelecionada, setTarefaSelecionada] = useState(null)

    const { tasks, setTasks } = useApp()

    function restaurarTarefa() {

        setTasks(tasks.map(task => {
            if (task.id === tarefaSelecionada) {
                return { ...task, deleted: false }
            }
            return task
        }));
        setMostrarModal(false)
    }

    return (
        <div className="lixo-bg">

            <TopBar setPagina={setPagina} />

            <div className="lixo-content">

                <h1 className="lixo-title">
                    Tarefas excluídas ({tasks.filter(task => task.deleted).length})
                </h1>

                {/* EM ANDAMENTO */}

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Em andamento (
                        {
                            tasks.filter(
                                task => task.category === "Em progresso" && task.deleted
                            ).length
                        }
                        )
                    </h2>

                    {
                        tasks.map(task => (

                            task.category === "Em progresso" && task.deleted && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.name}</h3>

                                        <span className="status andamento">
                                            Em progresso
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.dueDate?.time}</p>

                                        </div>

                                        <button
                                            className="restaurar-button"
                                            onClick={() => {
                                                setMostrarModal(true)
                                                setTarefaSelecionada(task.id)
                                            }}
                                        >
                                            Restaurar tarefa
                                        </button>

                                    </div>

                                </div>

                            )

                        ))
                    }

                </div>

                {/* ATRASADAS */}

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Atrasadas (
                        {
                            tasks.filter(
                                task => task.category === "Atrasada" && task.deleted
                            ).length
                        }
                        )
                    </h2>

                    {
                        tasks.map(task => (

                            task.category === "Atrasada" && task.deleted && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.name}</h3>

                                        <span className="status atrasada">
                                            Atrasada
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.dueDate?.time}</p>

                                        </div>

                                        <button
                                            className="restaurar-button"
                                            onClick={() => {
                                                setMostrarModal(true)
                                                setTarefaSelecionada(task.id)
                                            }}
                                        >
                                            Restaurar tarefa
                                        </button>

                                    </div>

                                </div>

                            )

                        ))
                    }

                </div>

                {/* CONCLUÍDAS */}

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Concluídas (
                        {
                            tasks.filter(
                                task => task.category === "Concluída" && task.deleted
                            ).length
                        }
                        )
                    </h2>

                    {
                        tasks.map(task => (

                            task.category === "Concluída" && task.deleted && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.name}</h3>

                                        <span className="status concluida">
                                            Concluída
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.dueDate?.time}</p>

                                        </div>

                                        <button
                                            className="restaurar-button"
                                            onClick={() => {
                                                setMostrarModal(true)
                                                setTarefaSelecionada(task.id)
                                            }}
                                        >
                                            Restaurar tarefa
                                        </button>

                                    </div>

                                </div>

                            )

                        ))
                    }

                </div>

            </div>

            <SideBar
                paginaAtual="lixo"
                setPagina={setPagina}
            />

            {
                mostrarModal && (

                    <div className="modal-overlay">

                        <div className="modal-card">

                            <div className="modal-top">

                                <span>(!)</span>

                            </div>

                            <div className="modal-content">

                                <h1>
                                    Restaurar tarefa
                                </h1>

                                <div className="modal-buttons">

                                    <button
                                        onClick={restaurarTarefa}
                                    >
                                        SIM
                                    </button>

                                    <button
                                        onClick={() => setMostrarModal(false)}
                                    >
                                        NÃO
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    )
}