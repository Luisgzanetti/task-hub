# Documentação de Rotas API - TaskHub 🚀

Este documento descreve todas as rotas disponíveis na API do TaskHub, os métodos HTTP aceitos, formatos de entrada e exemplos de respostas de sucesso e erro baseados na implementação atual do projeto.

---

## Prefixo da API
Todas as rotas estão sob o prefixo global da API:
`http://localhost:3000/api`

---

## 🔑 1. Módulo de Autenticação

Gerencia a autenticação e login de usuários no sistema.

### POST `/usuarios/login`
Realiza o login de um usuário utilizando E-mail ou CPF como identificador.

* **Corpo da Requisição (JSON):**
  ```json
  {
    "identificador": "usuario@email.com",
    "senha": "senhaSegura123"
  }
  ```
  *(O identificador também pode ser o CPF sem formatação, ex: `"12345678901"`)*

* **Respostas:**
  * **`200 OK` (Login realizado com sucesso):**
    ```json
    {
      "mensagem": "Logado com sucesso!",
      "usuario": {
        "id_usuario": 1,
        "nome": "usuario",
        "email": "usuario@email.com",
        "cpf": "12345678901",
        "data_nascimento": "2000-01-01T03:00:00.000Z"
      }
    }
    ```
  * **`400 Bad Request` (Campos obrigatórios ausentes):**
    ```json
    {
      "erro": "Identificador (e-mail ou CPF) e senha são obrigatórios."
    }
    ```
  * **`401 Unauthorized` (Senha incorreta):**
    ```json
    {
      "erro": "Senha incorreta."
    }
    ```
  * **`404 Not Found` (Usuário não cadastrado):**
    ```json
    {
      "erro": "Usuário não encontrado."
    }
    ```

---

## 👤 2. Módulo de Usuários (`/usuarios`)

Gerencia o cadastro e a atualização de dados cadastrais dos usuários.

### POST `/usuarios`
Realiza o cadastro de um novo usuário.

* **Corpo da Requisição (JSON):**
  ```json
  {
    "nome": "usuario",
    "email": "usuario@email.com",
    "cpf": "123.456.789-01",
    "data_nascimento": "2000-01-01",
    "senha": "senhaSegura123",
    "confirmar_senha": "senhaSegura123"
  }
  ```

* **Respostas:**
  * **`201 Created` (Usuário cadastrado com sucesso):**
    ```json
    {
      "mensagem": "Usuário cadastrado com sucesso!",
      "usuario": {
        "id_usuario": 1,
        "nome": "usuario",
        "email": "usuario@email.com",
        "cpf": "12345678901"
      }
    }
    ```
  * **`400 Bad Request` (Falha na validação):**
    ```json
    {
      "erro": "As senhas digitadas não coincidem."
    }
    ```
    *(ou outros erros de validação executados no controlador, como e-mail ou CPF já cadastrados, CPF que não contém 11 dígitos numéricos, senha menor que 6 ou maior que 20 caracteres)*

---

### PUT `/usuarios`
Atualiza os dados cadastrais de um usuário existente.

* **Corpo da Requisição (JSON):**
  ```json
  {
    "id_usuario": 1,
    "nome": "usuario atualizado",
    "email": "novo_email@email.com",
    "cpf": "12345678901",
    "data_nascimento": "2000-01-01",
    "senha": "novaSenhaSegura123"
  }
  ```

* **Respostas:**
  * **`200 OK` (Usuário atualizado com sucesso):**
    ```json
    {
      "mensagem": "Usuário atualizado com sucesso!",
      "usuario": {
        "id_usuario": 1,
        "nome": "usuario atualizado",
        "email": "novo_email@email.com",
        "cpf": "12345678901",
        "data_nascimento": "2000-01-01T03:00:00.000Z"
      }
    }
    ```
  * **`500 Internal Server Error` (Erro inesperado):**
    ```json
    {
      "erro": "Erro interno ao editar usuário."
    }
    ```

---

## 📋 3. Módulo de Tarefas (`/tarefas`)

Gerencia a listagem, criação e edição de tarefas no sistema.

### GET `/tarefas`
Busca todas as tarefas associadas a um usuário específico.

* **Parâmetros da Requisição:**
  * Pode ser enviado como Query Parameter (`?id_usuario=1`) ou no corpo da requisição (`req.body.id_usuario`).
* **Respostas:**
  * **`200 OK` (Tarefas recuperadas com sucesso):**
    ```json
    {
      "mensagem": "Tarefas buscadas com sucesso!",
      "tarefas": [
        {
          "id_tarefa": 1,
          "id_usuario": 1,
          "id_status": 1,
          "titulo": "Estudar Node.js",
          "descricao": "Aprender a criar APIs RESTful com Express",
          "criado_em": "2026-06-12T03:00:00.000Z",
          "prazo_final": "2026-06-20T03:00:00.000Z",
          "deletado": 0,
          "status_nome": "Em progresso"
        }
      ]
    }
    ```
  * **`400 Bad Request` (Id do usuário ausente):**
    ```json
    {
      "erro": "O campo id_usuario é obrigatório."
    }
    ```

---

### POST `/tarefas`
Cria uma nova tarefa para um usuário.

* **Corpo da Requisição (JSON):**
  ```json
  {
    "id_usuario": 1,
    "id_status": 1,
    "titulo": "Criar Documentação do Projeto",
    "descricao": "Documentar as rotas e erros no repositório",
    "data_criacao": "2026-06-12",
    "prazo_final": "2026-06-15"
  }
  ```

* **Respostas:**
  * **`201 Created` (Tarefa criada com sucesso):**
    ```json
    {
      "mensagem": "Tarefa criada com sucesso!",
      "tarefa": {
        "id_tarefa": 11,
        "titulo": "Criar Documentação do Projeto",
        "descricao": "Documentar as rotas e erros no repositório",
        "data_criacao": "2026-06-12",
        "prazo_final": "2026-06-15",
        "id_usuario": 1
      }
    }
    ```
  * **`400 Bad Request` (Erro de validação ou campos ausentes):**
    ```json
    {
      "erro": "Todos os campos obrigatórios devem ser preenchidos."
    }
    ```
    *(ou caso o título exceda o limite de 200 caracteres)*

---

### PUT `/tarefas`
Edita os campos de uma tarefa existente (como título, descrição, status ou prazo final).

* **Corpo da Requisição (JSON):**
  ```json
  {
    "id_tarefa": 11,
    "id_status": 2,
    "titulo": "Criar Documentação do Projeto (Atualizado)",
    "descricao": "Atualizar rotas e erros",
    "prazo_final": "2026-06-16"
  }
  ```

* **Respostas:**
  * **`200 OK` (Tarefa editada com sucesso):**
    ```json
    {
      "mensagem": "Tarefa editada com sucesso!",
      "tarefa": {
        "id_tarefa": 11,
        "id_status": 2,
        "titulo": "Criar Documentação do Projeto (Atualizado)",
        "descricao": "Atualizar rotas e erros",
        "prazo_final": "2026-06-16"
      }
    }
    ```
  * **`400 Bad Request` (ID da tarefa ausente):**
    ```json
    {
      "erro": "O campo id_tarefa é obrigatório."
    }
    ```