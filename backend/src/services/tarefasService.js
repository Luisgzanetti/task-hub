import dbPromise from "../config/db.js";

/**
 * Cria uma nova tarefa.
 * @param {object} req - Objeto de requisição.
 * @param {object} res - Objeto de resposta.
 * @returns {Promise<void>} - Resposta com os dados da tarefa criada.
 */
export async function criarTarefa({ id_usuario, id_status, titulo, descricao, data_criacao, prazo_final }) {
    const db = await dbPromise

    // Formatar datas para o formato compatível com o MySQL (YYYY-MM-DD HH:mm:ss)
    const formattedCriacao = data_criacao ? data_criacao.replace('T', ' ').slice(0, 19) : null;
    const formattedPrazo = prazo_final ? prazo_final.replace('T', ' ').slice(0, 19) : null;

    const query = `
        INSERT INTO tarefas (id_usuario, id_status, titulo, descricao, criado_em, prazo_final)
        VALUES (?, ?, ?, ?, ?, ?)
    `
    const [result] = await db.execute(query, [
        id_usuario,
        id_status,
        titulo,
        descricao ?? null,
        formattedCriacao,
        formattedPrazo
    ]);

    return {
        id_tarefa: result.insertId,
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
    const [rows] = await db.execute(query, [id_usuario])
    return rows
}

export async function editarTarefa(id_tarefa, { id_status, titulo, descricao, prazo_final }) {
    const db = await dbPromise;
    const query = `
        UPDATE tarefas
        SET id_status = ?, titulo = ?, descricao = ?, prazo_final = ?
        WHERE id_tarefa = ?
    `
    const [result] = await db.execute(query, [
        id_status ?? null,
        titulo ?? null,
        descricao ?? null,
        prazo_final ?? null,
        id_tarefa
    ])

    return {
        result,
        id_tarefa,
        id_status,
        titulo,
        descricao,
        prazo_final
    }
}

export async function deletarTarefa(id_tarefa) {
    const db = await dbPromise;

    const query = `
        UPDATE tarefas
        SET deletado = 1
        WHERE id_tarefa = ?
    `;

    const [result] = await db.execute(query, [id_tarefa]);

    return result.affectedRows > 0;
}

export async function restaurarTarefa(id_tarefa) {
    const db = await dbPromise;

    const query = `
        UPDATE tarefas
        SET deletado = 0
        WHERE id_tarefa = ?
    `;

    const [result] = await db.execute(query, [id_tarefa]);

    return result.affectedRows > 0;
}
