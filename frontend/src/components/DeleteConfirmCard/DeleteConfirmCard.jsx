import { BiSolidTrashAlt } from "react-icons/bi";
import Button from "../Button/Button";
import './DeleteConfirmCard.css';

export default function DeleteConfirmCard({ deleteId, setDeleteId, deleteTask }) {

    return (
        <div className="delete-overlay" onClick={() => setDeleteId(null)}>
            <div className="main-card" onClick={(e) => e.stopPropagation()}>
                <div className="top-div">
                    <BiSolidTrashAlt className="trash-icon" />
                </div>
                <h1 className="confirm-title">Excluir Tarefa?</h1>
                <div className="confirm-buttons">
                    <Button onClick={() => setDeleteId(null)} label="Cancelar" />
                    <Button onClick={() => deleteTask(deleteId)} label="Excluir" />
                </div>
            </div>
        </div>
    )

}