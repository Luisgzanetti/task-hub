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
        VALUES (?, 
                CASE WHEN ? = 1 AND ? < NOW() THEN 3 ELSE ? END, 
                ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
        id_usuario,
        id_status,
        formattedPrazo,
        id_status,
        titulo,
        descricao ?? null,
        formattedCriacao,
        formattedPrazo
    ]);

    // Busca a tarefa recém criada para obter o estado real do banco de dados
    const [rows] = await db.execute(`
        SELECT t.*, s.nome AS status_nome 
        FROM tarefas t
        LEFT JOIN status s ON t.id_status = s.id_status
        WHERE t.id_tarefa = ?
    `, [result.insertId]);

    const tarefa = rows[0] || null;
    if (tarefa) {
        tarefa.data_criacao = tarefa.criado_em;
    }

    return tarefa;
}

export async function buscarTarefas(id_usuario) {
    const db = await dbPromise;

    // Atualiza as tarefas em andamento (id_status = 1) que passaram do prazo para "Atrasada" (id_status = 3)
    await db.execute(`
        UPDATE tarefas
        SET id_status = 3
        WHERE id_usuario = ? AND id_status = 1 AND prazo_final < NOW()
    `, [id_usuario]);

    const query = `
        SELECT t.*, s.nome AS status_nome 
        FROM tarefas t
        LEFT JOIN status s ON t.id_status = s.id_status
        WHERE t.id_usuario = ?
    `;
    const [rows] = await db.execute(query, [id_usuario]);
    return rows;
}

export async function editarTarefa(id_tarefa, { id_status, titulo, descricao, prazo_final }) {
    const db = await dbPromise;

    // Formatar datas para o formato compatível com o MySQL (YYYY-MM-DD HH:mm:ss)
    const formattedPrazo = prazo_final ? prazo_final.replace('T', ' ').slice(0, 19) : null;

    const query = `
        UPDATE tarefas
        SET id_status = CASE 
            WHEN ? = 1 AND ? < NOW() THEN 3 
            ELSE ? 
        END, 
        titulo = ?, 
        descricao = ?, 
        prazo_final = ?
        WHERE id_tarefa = ?
    `;
    await db.execute(query, [
        id_status,
        formattedPrazo,
        id_status,
        titulo ?? null,
        descricao ?? null,
        formattedPrazo,
        id_tarefa
    ]);

    // Busca a tarefa atualizada no banco de dados para retornar o estado real
    const [rows] = await db.execute(`
        SELECT t.*, s.nome AS status_nome 
        FROM tarefas t
        LEFT JOIN status s ON t.id_status = s.id_status
        WHERE t.id_tarefa = ?
    `, [id_tarefa]);

    return rows[0] || null;
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
