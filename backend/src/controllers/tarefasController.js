import * as tarefasService from '../services/tarefasService.js';

/**
 * Controller responsável por funções relacionadas às tarefas
 */

export async function criarTarefa(req, res) {
    try {
        const { id_usuario, id_status, titulo, descricao, data_criacao, prazo_final } = req.body

        if (!id_usuario || !id_status || !titulo || !data_criacao || !prazo_final) {
            return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        if (titulo.length > 200) {
            return res.status(400).json({ erro: "O título deve ter no máximo 200 caracteres." });
        }

        const tarefa = await tarefasService.criarTarefa({
            id_usuario,
            id_status,
            titulo,
            descricao,
            data_criacao,
            prazo_final,
        })
        return res.status(201).json({
            mensagem: 'Tarefa criada com sucesso!',
            tarefa: {
                id_tarefa: tarefa.id_tarefa,
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                data_criacao: tarefa.data_criacao,
                prazo_final: tarefa.prazo_final,
                id_usuario: tarefa.id_usuario
            }
        })
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        return res.status(500).json({ error: "Erro interno ao criar tarefa" });
    }
}

export async function buscarTarefas(req, res) {
    try {
        const id_usuario = req.query.id_usuario || req.body.id_usuario

        if (!id_usuario) {
            return res.status(400).json({ erro: "O campo id_usuario é obrigatório." });
        }

        const tarefas = await tarefasService.buscarTarefas(id_usuario)

        return res.status(200).json({
            mensagem: "Tarefas buscadas com sucesso!",
            tarefas
        })
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        return res.status(500).json({ error: "Erro interno ao buscar tarefas" });
    }
}

export async function editarTarefa(req, res) {
    try {
        const { id_tarefa, id_status, titulo, descricao, prazo_final } = req.body

        if (!id_tarefa) {
            return res.status(400).json({ erro: "O campo id_tarefa é obrigatório." });
        }

        if (titulo && titulo.length > 200) {
            return res.status(400).json({ erro: "O título deve ter no máximo 200 caracteres." });
        }

        const tarefa = await tarefasService.editarTarefa(id_tarefa, {
            id_status,
            titulo,
            descricao,
            prazo_final,
        })
        return res.status(200).json({
            mensagem: "Tarefa editada com sucesso!",
            tarefa
        })

    } catch (error) {
        console.error("Erro ao editar tarefa:", error)
        return res.status(500).json({ erro: "Erro interno ao editar tarefa" });
    }
}

export async function deletarTarefa(req, res) {
    try {
        
        const { id_tarefa } = req.params;
        
        if (!id_tarefa) {
            return res.status(400).json({ erro: "O parâmetro id_tarefa na URL é obrigatório." });
        }

        await tarefasService.deletarTarefa(id_tarefa);

        return res.status(200).json({
            mensagem: "Tarefa deletada com sucesso!",
            id_tarefa_deletada: id_tarefa
        });

    } catch (error) {
        console.error("Erro ao deletar tarefa:", error);
        return res.status(500).json({ erro: "Erro interno ao deletar tarefa" });
    }
}
