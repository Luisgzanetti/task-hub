import './SideBar.css'

import { BiBookOpen } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
import { BiUser } from "react-icons/bi";


export default function Sidebar({ paginaAtual, setPagina }) {

    return (
        <div className="sidebar-container">

            <button
                className={`sidebar-button ${paginaAtual === "home" ? "sidebar-active" : ""}`}
                onClick={() => setPagina("home")}
            >
                <BiBookOpen size={28} />
            </button>

            <button
                className={`sidebar-button ${paginaAtual === "lixo" ? "sidebar-active" : ""}`}
                onClick={() => setPagina("lixo")}
            >
                <BiTrash size={28} />
            </button>

            <button
                className={`sidebar-button ${paginaAtual === "user" ? "sidebar-active" : ""}`}
                onClick={() => setPagina("user")}
            >
                <BiUser size={28} />
            </button>

            <button className="sidebar-logo-button">
                <img
                    src="/Logo.png"
                    alt="logo"
                    className="sidebar-logo"
                />

            </button>

        </div>
    )
}