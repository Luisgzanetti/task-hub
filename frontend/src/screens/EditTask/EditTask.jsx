import "./EditTask.css";
import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import TopBar from "../../components/TopBar/TopBar";
import TaskCardModel from "../../components/TaskCardModel/TaskCardModel";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function EditTask({ setPagina, taskId, setSelectedTaskId }) {

    const { tasks, setTasks } = useApp();

    const [task, setTask] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const foundTask = tasks.find(t => t.id === taskId);
        if (foundTask) {
            setTask(foundTask);
            setTitle(foundTask.name);
            setDescription(foundTask.description);
            setDate(foundTask.dueDate?.date || "");
            setTime(foundTask.dueDate?.time || "");
            setCategory(foundTask.category);
        }
    }, [taskId]);

    const previewTask = {
        ...task,
        name: title,
        description: description,
        dueDate: { date, time },
        category: category
    };

    function updateTask() {
        setTasks(prevTasks => prevTasks.map(t => {
            if (t.id === taskId) {
                return {
                    ...t,
                    name: title,
                    description: description,
                    dueDate: { date, time }
                };
            }
            return t;
        }));
    }

    return (
        <div className="home-bg">
            <TopBar setPagina={setPagina} />
            <div className="preview-div">
                {task && task.id && <TaskCardModel task={previewTask} />}
            </div>
            <div className="inputs-div">
                <Input title="Nome" placeholder={task.name} value={title} setValue={setTitle}></Input>
                <Input title="Descrição" placeholder={task.description} value={description} setValue={setDescription}></Input>
                <Input title="Data" placeholder={task.dueDate?.date} value={date} setValue={setDate}></Input>
                <Input title="Hora" placeholder={task.dueDate?.time} value={time} setValue={setTime}></Input>
            </div>
            <div className="button-div">
                <Button onClick={() => { updateTask(); setPagina("home") }} label={"Editar"}></Button>
            </div>
        </div>
    )
}