import './Lixo.css'

import TopBar from '../../components/TopBar/TopBar.jsx'
import SideBar from '../../components/SideBar/SideBar.jsx'

import { BiTime } from "react-icons/bi";

export default function Lixo({ setPagina }) {

    const tarefas = [
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
            categoria: "Atrasada"
        },
        {
            id: 3,
            nome: "Nome",
            prazo: "XX:XX",
            categoria: "Concluída"
        }
    ]

    return (
        <div className="lixo-bg">

            <TopBar setPagina={setPagina} />

            <div className="lixo-content">

                <h1 className="lixo-title">
                    Tarefas excluídas (5)
                </h1>

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Em andamento (1)
                    </h2>

                    {tarefas.map(task => (
                        task.categoria === "Em progresso" && (

                            <div className="lixo-card" key={task.id}>

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

                                    <button className="restaurar-button">
                                        Restaurar tarefa
                                    </button>

                                </div>

                            </div>

                        )
                    ))}

                </div>

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Atrasadas (1)
                    </h2>

                    {tarefas.map(task => (
                        task.categoria === "Atrasada" && (

                            <div className="lixo-card" key={task.id}>

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

                                    <button className="restaurar-button">
                                        Restaurar tarefa
                                    </button>

                                </div>

                            </div>

                        )
                    ))}

                </div>

                <div className="lixo-section">

                    <h2 className="lixo-subtitle">
                        Concluídas (1)
                    </h2>

                    {tarefas.map(task => (
                        task.categoria === "Concluída" && (

                            <div className="lixo-card" key={task.id}>

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

                                    <button className="restaurar-button">
                                        Restaurar tarefa
                                    </button>

                                </div>

                            </div>

                        )
                    ))}

                </div>

            </div>

            <SideBar
                paginaAtual="lixo"
                setPagina={setPagina}
            />

        </div>
    )
}