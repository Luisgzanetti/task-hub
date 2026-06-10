import dbPromise from '../config/db.js';

/**
 * Busca um usuário pelo e-mail.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function findByEmail(email) {
    const db = await dbPromise;
    const row = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
    return row || null;
}

/**
 * Busca um usuário pelo CPF (removendo formatação para comparar).
 * @param {string} cpf
 * @returns {Promise<object|null>}
 */
export async function findByCpf(cpf) {
    const db = await dbPromise;
    const cleanedCpf = cpf.replace(/\D/g, '');
    const row = await db.get('SELECT * FROM usuarios WHERE cpf = ?', [cleanedCpf]);
    return row || null;
}

/**
 * Cria um novo usuário no banco de dados.
 * @param {object} usuarioData
 * @returns {Promise<object>}
 */
export async function criarUsuario({ nome, email, cpf, data_nascimento, senha, foto_perfil = null }) {
    const db = await dbPromise;
    const cleanedCpf = cpf.replace(/\D/g, '');
    const query = `
        INSERT INTO usuarios (nome, email, cpf, data_nascimento, senha, foto_perfil)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await db.run(query, [nome, email, cleanedCpf, data_nascimento, senha, foto_perfil]);

    return {
        id_usuario: result.lastID,
        nome,
        email,
        cpf: cleanedCpf,
        data_nascimento,
        foto_perfil
    };
}
