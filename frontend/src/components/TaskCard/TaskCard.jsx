import './TaskCard.css'
import { useState } from 'react';
import { BiSolidTime } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BiSolidTrashAlt } from "react-icons/bi";



export default function TaskCard({ task }) {

    const [details, setDetails] = useState(false)
    const handleDropdownClick = () => {
        setDetails(!details)
    }

    return (
        <div className="task-card">
            <div className='task-top-content'>
                <button className='complete-btn'></button>
                <div className='task-content'>
                    <div className='task-title-display'>
                        <p className='task-title'>{task.name}</p>
                        <BiChevronDown className='dropdown-icon' onClick={handleDropdownClick} />
                    </div>
                    <div className='due-date-container'>
                        <BiSolidTime size={24} />
                        <p className='due-date-text'>Prazo: {task.dueDate.time}</p>
                    </div>
                </div>
                <div className={`task-category-card ${task.category === 'overdue' ? 'overdue-category' : task.category === 'in_progress' ? 'in_progress-category' : 'completed-category'}`}>
                    <p className='task-category-text'>{task.category}</p>
                </div>
            </div>
            {details && (
                <div className='task-details'>
                    <p className='task-description'>Descrição: {task.description}</p>
                    <div className='details-buttons'>
                        <BiPencil size={32} className='edit-btn' />
                        <BiSolidTrashAlt size={32} className='delete-btn' />
                    </div>
                </div>
            )}
        </div>
    )
}