import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'bancotaskhub';

const connectionOpts = {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword
};

const dbPromise = (async () => {
    try {
        console.log(`Tentando conectar ao MySQL em ${dbHost}:${dbPort} para verificar o banco de dados...`);

        // 1. Criar o banco de dados se não existir
        const tempConn = await mysql.createConnection(connectionOpts);
        await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await tempConn.end();
        console.log(`Banco de dados "${dbName}" verificado/criado.`);

        // 2. Criar o Pool de conexões definitivo com o banco selecionado
        const pool = mysql.createPool({
            ...connectionOpts,
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log('Conectado ao pool de banco de dados MySQL com sucesso!');

        // 3. Criar tabela de usuários
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                cpf CHAR(11) NOT NULL UNIQUE,
                data_nascimento DATE NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                senha VARCHAR(20) NOT NULL,
                foto_perfil VARCHAR(255),
                criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT chk_senha CHECK (CHAR_LENGTH(senha) BETWEEN 6 AND 20)
            );
        `);

        // 4. Criar tabela de status das tarefas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS status (
                id_status INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(50) NOT NULL UNIQUE
            );
        `);

        // 5. Alimentar a tabela de status (seeds) se estiver vazia
        const [statusRows] = await pool.query('SELECT COUNT(*) as count FROM status');
        if (statusRows[0].count === 0) {
            await pool.query(`
                INSERT INTO status (nome) VALUES 
                ('Em progresso'), 
                ('Concluída'), 
                ('Atrasada')
            `);
            console.log('Tabela de status alimentada com sucesso!');
        }

        // 6. Criar tabela de tarefas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tarefas (
                id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
                id_usuario INT NOT NULL,
                id_status INT NOT NULL,
                titulo VARCHAR(200) NOT NULL,
                descricao TEXT,
                criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                prazo_final DATETIME NOT NULL,
                deletado TINYINT(1) NOT NULL DEFAULT 0,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
                FOREIGN KEY (id_status) REFERENCES status(id_status)
            );
        `);

        console.log('Tabelas do banco de dados MySQL inicializadas!');

        // 7. Retornar wrapper compatível com SQLite (get, all, run, exec)
        return {
            async get(sql, params = []) {
                const [rows] = await pool.execute(sql, params);
                return rows[0] || null;
            },
            async all(sql, params = []) {
                const [rows] = await pool.execute(sql, params);
                return rows;
            },
            async run(sql, params = []) {
                const [result] = await pool.execute(sql, params);
                return {
                    lastID: result.insertId,
                    changes: result.affectedRows
                };
            },
            async exec(sql) {
                await pool.query(sql);
            },
            pool
        };
    } catch (err) {
        console.error('Erro ao conectar ou inicializar o MySQL:', err.message);
        throw err;
    }
})();

export default dbPromise;
