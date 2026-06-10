import dbPromise from "../config/db.js";

/**
 * Cria uma nova tarefa.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 * @returns {Promise<void>} - Resposta com os dados da tarefa criada.
 */
export async function criarTarefa({ id_usuario, id_status, titulo, descricao, data_criacao, prazo_final }) {
    const db = await dbPromise
    const query = `
        INSERT INTO tarefas (id_usuario, id_status, titulo, descricao, criado_em, prazo_final)
        VALUES (?, ?, ?, ?, ?, ?)
    `
    const result = await db.run(query, [
        id_usuario,
        id_status,
        titulo,
        descricao,
        data_criacao,
        prazo_final
    ])

    return {
        id_tarefa: result.lastID,
        titulo,
        descricao,
        data_criacao,
        prazo_final,
        id_usuario,
        id_status
    }
}

export async function buscarTarefas(id_usuario) {
    const db = await dbPromise
    const query = `
        SELECT t.*, s.nome AS status_nome 
        FROM tarefas t
        LEFT JOIN status s ON t.id_status = s.id_status
        WHERE t.id_usuario = ?
    `
    const result = await db.all(query, [id_usuario])
    return result
}