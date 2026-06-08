import "./FilterCard.css";
import { BiFilterAlt } from "react-icons/bi";
import Button from "../Button/Button";

export default function FilterCard({ setShowFilterOverlay, showOverdue, setShowOverdue, showOngoing, setShowOngoing, showCompleted, setShowCompleted }) {
    return (
        <div className="filter-overlay" onClick={() => setShowFilterOverlay(false)}>
            <div className="main-card" onClick={(e) => e.stopPropagation()}>
                <div className="filter-top-div">
                    <BiFilterAlt className="filter-icon" />
                </div>
                <h1 className="filter-title">Filtrar Tarefas</h1>
                <div className="filter-buttons">
                    <button className={`filter-button ${showOverdue && showOngoing && showCompleted ? 'selected' : ''}`} onClick={() => { setShowOverdue(true); setShowOngoing(true); setShowCompleted(true); setShowFilterOverlay(false); }}>Todas</button>
                    <button className={`filter-button ${showOverdue && !showOngoing && !showCompleted ? 'selected' : ''}`} onClick={() => { setShowOverdue(true); setShowOngoing(false); setShowCompleted(false); setShowFilterOverlay(false); }}>Atrasadas</button>
                    <button className={`filter-button ${!showOverdue && showOngoing && !showCompleted ? 'selected' : ''}`} onClick={() => { setShowOverdue(false); setShowOngoing(true); setShowCompleted(false); setShowFilterOverlay(false); }}>Em Andamento</button>
                    <button className={`filter-button ${!showOverdue && !showOngoing && showCompleted ? 'selected' : ''}`} onClick={() => { setShowOverdue(false); setShowOngoing(false); setShowCompleted(true); setShowFilterOverlay(false); }}>Concluídas</button>
                </div>
            </div>
        </div>
    )
}