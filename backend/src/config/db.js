import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Abre ou cria o arquivo database.db na raiz do backend
const dbPromise = open({
    filename: path.join(__dirname, '../../database.db'),
    driver: sqlite3.Database
});

// Inicialização e criação de tabelas automaticamente
dbPromise.then(async (db) => {
    console.log('Conectado ao banco de dados SQLite com sucesso!');

    // 1. Criar tabela de usuários
    await db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            data_nascimento TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            foto_perfil TEXT,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 2. Criar tabela de status das tarefas
    await db.exec(`
        CREATE TABLE IF NOT EXISTS status (
            id_status INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE
        );
    `);

    // 3. Alimentar a tabela de status (seeds) se estiver vazia
    const statusCount = await db.get('SELECT COUNT(*) as count FROM status');
    if (statusCount.count === 0) {
        await db.run(`
            INSERT INTO status (nome) VALUES 
            ('Em progresso'), 
            ('Concluída'), 
            ('Atrasada')
        `);
        console.log('Tabela de status alimentada com sucesso!');
    }

    // 4. Criar tabela de tarefas
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tarefas (
            id_tarefa INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            id_status INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT,
            criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            prazo_final DATETIME NOT NULL,
            deletado INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
            FOREIGN KEY (id_status) REFERENCES status(id_status)
        );
    `);

    console.log('Tabelas do banco de dados inicializadas!');
}).catch((err) => {
    console.error('Erro ao conectar ou inicializar o SQLite:', err.message);
});

export default dbPromise;
