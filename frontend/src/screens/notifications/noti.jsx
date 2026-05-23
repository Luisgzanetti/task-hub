import './noti.css'

import TopBar from '../../components/TopBar/TopBar'
import SideBar from "../../components/SideBar/SideBar.jsx";
import { BiSearch } from "react-icons/bi";
import { BiSolidBellRing } from "react-icons/bi";

export default function Notification({ setPagina }) {

    return (
        <div className="notification-bg">

            <TopBar setPagina={setPagina} />

            <div className='notification-search-container'>

                <div className='notification-search-bar'>
                    <input
                        type="text"
                        placeholder='Buscar notificações...'
                    />

                    <BiSearch size={28} />
                </div>

            </div>

            <div className='notification-content'>

                <h1 className='notification-title'>
                    Minhas Notificações
                </h1>

                <div className='notification-section'>

                    <h2 className='notification-subtitle'>
                        Hoje
                    </h2>

                    <div className='notification-card'>

                        <BiSolidBellRing size={28} />

                        <div>
                            <h3>Tarefa pendente</h3>

                            <p>
                                Sua tarefa “...” deve ser finalizada hoje até XX:XX.
                            </p>
                        </div>

                    </div>

                    <div className='notification-card'>

                        <BiSolidBellRing size={28} />

                        <div>
                            <h3>Tarefa atrasada</h3>

                            <p>
                                Sua tarefa “...” está atrasada em 1 dia.
                            </p>
                        </div>

                    </div>

                </div>

                <div className='notification-section'>

                    <h2 className='notification-subtitle'>
                        Ontem
                    </h2>

                    <div className='notification-card'>

                        <BiSolidBellRing size={28} />

                        <div>
                            <h3>Tarefa atrasada</h3>

                            <p>
                                Sua tarefa “...” está atrasada em 3 dias.
                            </p>
                        </div>

                    </div>

                </div>

            </div>   
            <SideBar
                paginaAtual="home"
                setPagina={setPagina}
            />
        </div>
    )
}