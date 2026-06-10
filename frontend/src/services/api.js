const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Cadastra um novo usuário no backend.
 * @param {object} userData - Objeto contendo nome, email, cpf, data_nascimento, senha e confirmar_senha.
 * @returns {Promise<object>}
 */
export async function cadastrarUsuario(userData) {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.erro || 'Erro ao realizar o cadastro.');
    }

    return data;
}

const STATUS_MAP = {
    "Em progresso": 1,
    "Concluída": 2,
    "Atrasada": 3
};

const STATUS_REV_MAP = {
    1: "Em progresso",
    2: "Concluída",
    3: "Atrasada"
};

export async function criarTarefa(tarefaData) {
    const backendData = {
        id_usuario: tarefaData.id_usuario || 1,
        id_status: STATUS_MAP[tarefaData.category] || 1,
        titulo: tarefaData.name,
        descricao: tarefaData.description,
        data_criacao: new Date().toISOString(),
        prazo_final: `${tarefaData.dueDate?.date || ''} ${tarefaData.dueDate?.time || '23:59:59'}`
    };

    const response = await fetch(`${API_BASE_URL}/tarefas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar tarefa');
    }

    return data;
}

export async function buscarTarefas(idUsuario) {
    const response = await fetch(`${API_BASE_URL}/tarefas?id_usuario=${idUsuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.erro || 'Erro ao buscar tarefas');
    }

    const mappedTasks = (data.tarefas || []).map(t => {
        let date = "";
        let time = "";
        if (t.prazo_final) {
            const parts = t.prazo_final.split(" ");
            date = parts[0] || "";
            time = parts[1] || "";
        }
        return {
            id: t.id_tarefa,
            name: t.titulo,
            description: t.descricao,
            category: t.status_nome || STATUS_REV_MAP[t.id_status] || "Em progresso",
            createdAt: t.criado_em,
            dueDate: { date, time },
            deleted: t.deletado === 1
        };
    });

    return mappedTasks;
}