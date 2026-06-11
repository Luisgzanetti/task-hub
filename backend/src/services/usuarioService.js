import dbPromise from '../config/db.js';

/**
 * Busca um usuário pelo e-mail.
 * @param {string} email
 * @returns {Promise<object|null>}
 */
export async function findByEmail(email) {
    const db = await dbPromise;
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null;
}

/**
 * Busca um usuário pelo CPF (removendo formatação para comparar).
 * @param {string} cpf
 * @returns {Promise<object|null>}
 */
export async function findByCpf(cpf) {
    const db = await dbPromise;
    const cleanedCpf = cpf.replace(/\D/g, '');
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE cpf = ?', [cleanedCpf]);
    return rows[0] || null;
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
    const [result] = await db.execute(query, [nome, email, cleanedCpf, data_nascimento, senha, foto_perfil]);

    return {
        id_usuario: result.insertId,
        nome,
        email,
        cpf: cleanedCpf,
        data_nascimento,
        foto_perfil
    };
}

export async function atualizarUsuario({ id_usuario, nome, email, cpf, data_nascimento, senha }) {
    const db = await dbPromise;

    // Buscar dados atuais para evitar sobrescrever com undefined/null
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    const usuarioAtual = rows[0];
    if (!usuarioAtual) {
        throw new Error('Usuário não encontrado');
    }

    const finalNome = nome !== undefined ? nome : usuarioAtual.nome;
    const finalEmail = email !== undefined ? email : usuarioAtual.email;
    const finalCpf = cpf !== undefined ? cpf.replace(/\D/g, '') : usuarioAtual.cpf;
    const finalData = data_nascimento !== undefined ? data_nascimento : usuarioAtual.data_nascimento;
    const finalSenha = senha !== undefined ? senha : usuarioAtual.senha;

    const query = `
        UPDATE usuarios
        SET nome = ?, email = ?, cpf = ?, data_nascimento = ?, senha = ?
        WHERE id_usuario = ?
    `;
    await db.execute(query, [
        finalNome,
        finalEmail,
        finalCpf,
        finalData,
        finalSenha,
        id_usuario
    ]);

    return {
        id_usuario,
        nome: finalNome,
        email: finalEmail,
        cpf: finalCpf,
        data_nascimento: finalData
    };
}
