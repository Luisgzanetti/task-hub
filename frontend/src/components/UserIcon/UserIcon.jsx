import './UserIcon.css';
import { BiSolidUser } from "react-icons/bi";

export default function UserIcon() {
    return (
        <div className="user-icon-circle">
            <BiSolidUser size={24}></BiSolidUser>
        </div>
    )
}