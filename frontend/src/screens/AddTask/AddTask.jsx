import "./AddTask.css";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import TopBar from "../../components/TopBar/TopBar";
import TaskCardModel from "../../components/TaskCardModel/TaskCardModel";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function AddTask({ setPagina }) {

    const { tasks, setTasks } = useApp();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("Em progresso");

    const previewTask = {
        name: title,
        description: description,
        dueDate: { date, time },
        category: category
    };

    function addTask() {
        setTasks(prevTasks => {
            const nextId = prevTasks.length > 0 ? Math.max(...prevTasks.map(t => t.id)) + 1 : 1;
            const newTask = {
                id: nextId,
                name: title,
                description: description,
                dueDate: { date, time },
                category: category
            };
            return [...prevTasks, newTask];
        });
    }

    return (
        <div className="home-bg">
            <TopBar setPagina={setPagina} />
            <div className="preview-div">
                {<TaskCardModel task={previewTask} />}
            </div>
            <div className="inputs-div">
                <Input title="Nome" value={title} setValue={setTitle}></Input>
                <Input title="Descrição" value={description} setValue={setDescription}></Input>
                <Input title="Data" value={date} setValue={setDate}></Input>
                <Input title="Hora" value={time} setValue={setTime}></Input>
            </div>
            <div className="button-div">
                <Button onClick={() => { addTask(); setPagina("home") }} label={"Adicionar"}></Button>
            </div>
        </div>
    )
}