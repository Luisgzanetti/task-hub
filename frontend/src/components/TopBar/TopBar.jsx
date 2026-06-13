import './TopBar.css';
import UserIcon from '../UserIcon/UserIcon';
import { BiSolidBellRing } from "react-icons/bi";

export default function TopBar({ setPagina, isNotification = false }) {

    return (
        <div className="top-bar-card">

            <div className="top-bar-left-content" onClick={() => setPagina("user")}>
                <UserIcon />
                <h2 className="top-bar-welcome-text">
                    Olá, Nome👋
                </h2>
            </div>

            <BiSolidBellRing
                size={24}
                color={isNotification ? 'var(--light-cyan)' : '#FFF'}
                className={`top-bar-notification-icon ${isNotification ? 'top-bar-notification-icon-cyan' : ''}`}
                onClick={() => setPagina("notification")}
            />

        </div>
    )
}