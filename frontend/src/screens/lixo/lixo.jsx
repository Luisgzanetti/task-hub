import './lixo.css'

import { useState } from "react"

import TopBar from '../../components/TopBar/TopBar'
import SideBar from '../../components/SideBar/SideBar'

import { BiTime } from "react-icons/bi";

export default function Lixo({ setPagina }) {

    const [mostrarModal, setMostrarModal] = useState(false)

    const [tarefaSelecionada, setTarefaSelecionada] = useState(null)

    const [tarefas, setTarefas] = useState([
        {
            id: 1,
            nome: "Nome",
            prazo: "XX:XX",
            categoria: "Em progresso"
        },
        {
            id: 2,
            nome: "Nome",
            prazo: "XX:XX",
            categoria: "Em progresso"
        },
        {
            id: 3,
            nome: "Nome",
            prazo: "XX:XX",
            categoria: "Atrasada"
        },
        {
            id: 4,
            nome: "Nome",
            prazo: "XX:XX",
            categoria: "Concluída"
        }
    ])

    function restaurarTarefa() {

        let novasTarefas = []

        for (let i = 0; i < tarefas.length; i++) {

            if (tarefas[i].id !== tarefaSelecionada) {

                novasTarefas.push(tarefas[i])

            }

        }

        setTarefas(novasTarefas)

        setMostrarModal(false)
    }

    return (
        <div className="lixo-bg">

            <TopBar setPagina={setPagina} />

            <div className="lixo-content">

                <h1 className="lixo-title">
                    Tarefas excluídas ({tarefas.length})
                </h1>

                {/* EM ANDAMENTO */}

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Em andamento (
                        {
                            tarefas.filter(
                                task => task.categoria === "Em progresso"
                            ).length
                        }
                        )
                    </h2>

                    {
                        tarefas.map(task => (

                            task.categoria === "Em progresso" && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.nome}</h3>

                                        <span className="status andamento">
                                            Em progresso
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.prazo}</p>

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
                            tarefas.filter(
                                task => task.categoria === "Atrasada"
                            ).length
                        }
                        )
                    </h2>

                    {
                        tarefas.map(task => (

                            task.categoria === "Atrasada" && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.nome}</h3>

                                        <span className="status atrasada">
                                            Atrasada
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.prazo}</p>

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
                            tarefas.filter(
                                task => task.categoria === "Concluída"
                            ).length
                        }
                        )
                    </h2>

                    {
                        tarefas.map(task => (

                            task.categoria === "Concluída" && (

                                <div
                                    className="lixo-card"
                                    key={task.id}
                                >

                                    <div className="lixo-card-top">

                                        <h3>{task.nome}</h3>

                                        <span className="status concluida">
                                            Concluída
                                        </span>

                                    </div>

                                    <div className="lixo-card-bottom">

                                        <div className="lixo-prazo">

                                            <BiTime size={18} />

                                            <p>Prazo, {task.prazo}</p>

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