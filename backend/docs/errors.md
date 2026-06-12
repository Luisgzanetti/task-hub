# Tratamento e Padrão de Erros - TaskHub ⚠️

Este documento descreve como a API do TaskHub gerencia falhas e erros nas requisições.

---

## 📋 Formato Padrão de Erro

De acordo com a especificação do projeto, o formato padrão idealizado de erro é:

```json
{
  "error": "Código",
  "message": "Descrição"
}
```

* **`error`:** Um identificador de código do erro (ex: `UNAUTHORIZED`, `VALIDATION_ERROR`, `NOT_FOUND`).
* **`message`:** Descrição legível e explicativa sobre o problema.

---

## 🚦 Erros Comuns e Retornos Atuais do Projeto

Atualmente, o projeto do TaskHub realiza o tratamento e validação de erros de forma direta nos controladores do backend, retornando um objeto simples com a propriedade `erro` (ou `error` em falhas internas do módulo de tarefas):

```json
{
  "erro": "Descrição detalhada do erro."
}
```

Abaixo estão detalhados os códigos de status HTTP comuns retornados pela API:

### 1. `400 Bad Request` (Erros de Validação e Campos Ausentes)
Retornado quando a requisição não preenche os critérios obrigatórios (ex: CPF inválido, senhas que não coincidem, campos vazios).

* **Exemplo de Resposta:**
  ```json
  {
    "erro": "O CPF deve conter exatamente 11 dígitos numéricos."
  }
  ```

### 2. `401 Unauthorized` (Credenciais Inválidas)
Ocorre quando o usuário tenta realizar login, mas fornece dados incompatíveis (ex: senha incorreta).

* **Exemplo de Resposta:**
  ```json
  {
    "erro": "Senha incorreta."
  }
  ```

### 3. `403 Forbidden` (Acesso Proibido)
Reservado para situações onde o usuário está autenticado, mas não possui autorização para ler, modificar ou deletar a tarefa de outro usuário.

* **Exemplo de Resposta:**
  ```json
  {
    "erro": "Você não tem permissão para realizar esta operação."
  }
  ```

### 4. `404 Not Found` (Recurso Não Encontrado)
Emitido quando a API não encontra o registro especificado no banco de dados.

* **Exemplo de Resposta:**
  ```json
  {
    "erro": "Usuário não encontrado."
  }
  ```

### 5. `500 Internal Server Error` (Erro Interno do Servidor)
Ocorre quando há uma exceção inesperada no servidor ou problemas de comunicação com o banco de dados.

* **Exemplos de Resposta:**
  ```json
  {
    "erro": "Erro interno ao realizar login."
  }
  ```
  ou
  ```json
  {
    "error": "Erro interno ao criar tarefa"
  }
  ```
