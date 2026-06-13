import "./AddTask.css";
import { useState } from "react";
import { useApp } from "../../context/AppContext";
import TopBar from "../../components/TopBar/TopBar";
import TaskCardModel from "../../components/TaskCardModel/TaskCardModel";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { criarTarefa } from "../../services/api";

export default function AddTask({ setPagina }) {

    const { carregarTarefas, usuario } = useApp();

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

    async function addTask() {
        try {
            await criarTarefa({
                id_usuario: usuario?.id_usuario || 1,
                name: title,
                description: description,
                dueDate: { date, time },
                category: category
            });
            await carregarTarefas();
            setPagina("home");
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            alert("Erro ao criar tarefa: " + error.message);
        }
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
                <Input title="Data" value={date} setValue={setDate} type="date"></Input>
                <Input title="Hora" value={time} setValue={setTime} type="time"></Input>
            </div>
            <div className="button-div">
                <Button onClick={addTask} label={"Adicionar"}></Button>
            </div>
        </div>
    )
}