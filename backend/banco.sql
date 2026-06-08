CREATE DATABASE IF NOT EXISTS bancotaskhub;
USE bancotaskhub; 

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    cpf CHAR(11) NOT NULL UNIQUE,

    data_nascimento DATE NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    senha VARCHAR(20) NOT NULL,

    foto_perfil VARCHAR(255),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_senha
        CHECK (CHAR_LENGTH(senha) BETWEEN 6 AND 20)
);

CREATE TABLE status (
    id_status INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO status (nome)
VALUES
('Em progresso'),
('Concluída'),
('Atrasada');

CREATE TABLE tarefas (

    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,

    id_usuario INT NOT NULL,

    id_status INT NOT NULL,

    titulo VARCHAR(200) NOT NULL,

    descricao TEXT,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    prazo_final DATETIME NOT NULL,

    deletado BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_status)
        REFERENCES status(id_status)
);

--drop bancotaskhub;