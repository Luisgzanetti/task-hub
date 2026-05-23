import './TopBar.css';
import UserIcon from '../UserIcon/UserIcon';
import { BiSolidBellRing } from "react-icons/bi";

export default function TopBar({ setPagina }) {

    return (
        <div className="top-bar-card">

            <div className="top-bar-left-content">
                <UserIcon />
                <h2 className="top-bar-welcome-text">
                    Olá, Nome👋
                </h2>
            </div>

            <BiSolidBellRing
                size={24}
                className='top-bar-notification-icon'
                onClick={() => setPagina("notification")}
            />

        </div>
    )
}