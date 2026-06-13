import { BiSolidTrashAlt, BiPencil, BiCheck, BiChevronDown, BiSolidTime } from "react-icons/bi";

export default function TaskCardModel({ task }) {

    return (
        <div className="task-card">
            <div className='task-top-content'>
                <button className={`complete-btn ${task.category === 'Concluída' ? 'complete-btn-active' : ''}`}>
                    {task.category === "Concluída" && <BiCheck size={24} color='white' />}
                </button>
                <div className='task-content'>
                    <div className='task-title-display'>
                        <p className='task-title'>{task.name}</p>
                        <BiChevronDown className='dropdown-icon' />
                    </div>
                    <div className='due-date-container'>
                        <BiSolidTime size={24} />
                        <p className='due-date-text'>Prazo: {task.dueDate?.time}</p>
                    </div>
                </div>
                <div className={`task-category-card ${task.category === 'Atrasada' ? 'overdue-category' : task.category === 'Em progresso' ? 'in_progress-category' : 'completed-category'}`}>
                    <p className='task-category-text'>{task.category}</p>
                </div>
            </div>
            <div className='task-details'>
                <p className='task-description'>Descrição: {task.description}</p>
                <div className='details-buttons'>
                    <BiPencil size={32} className='edit-btn' onClick={() => { if (typeof setSelectedTaskId === 'function') setSelectedTaskId(task.id); if (typeof setPagina === 'function') setPagina("edit") }} />
                    <BiSolidTrashAlt size={32} className='delete-btn' onClick={() => { if (typeof deleteTask === 'function') deleteTask(task.id) }} />
                </div>
            </div>
        </div>
    )
}