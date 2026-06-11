# Guia do Backend: TaskHub 🚀

Este documento foi criado para ajudar os membros do grupo a entenderem como o nosso backend funciona, mesmo sem experiência anterior. Aqui explicamos a arquitetura, os arquivos, as pastas e os conceitos principais da web.

---

## 1. O que é o Backend e uma API?

Imagine que nosso sistema é um **restaurante**:
* **Frontend (O Cliente):** É a mesa onde o cliente se senta. Ele olha o menu (a interface gráfica) e escolhe o prato.
* **Backend (A Cozinha):** É a cozinha. É onde as regras de negócio são aplicadas, onde a comida é preparada e onde ficam guardados os ingredientes. O cliente da mesa não vê a cozinha, mas depende dela para receber o prato.
* **API (O Garçom):** O garçom leva o pedido da mesa para a cozinha e depois traz o prato pronto de volta. Na programação, a **API (Application Programming Interface)** é a ponte que permite que o Frontend se comunique com o Backend.

---

## 2. Conceitos Fundamentais da Web

Quando o frontend se comunica com o backend, ele faz uma **Requisição (Request)** e o backend devolve uma **Resposta (Response)**. Essa conversa usa o protocolo **HTTP**.

### Métodos HTTP (Verbos)
Para dizer o que queremos fazer, usamos "verbos" específicos:
* **GET (Buscar):** Usado quando queremos **pedir** alguma informação do servidor (ex: listar todas as tarefas). Não altera nada no banco de dados.
* **POST (Criar):** Usado quando queremos **enviar** dados novos para serem salvos (ex: cadastrar um novo usuário ou criar uma nova tarefa).
* **PUT (Atualizar):** Usado quando queremos **substituir** ou atualizar todas as informações de algo existente (ex: editar o título e a descrição de uma tarefa).
* **PATCH (Atualizar Parcial):** Semelhante ao PUT, mas usado para alterar apenas um pedaço (ex: marcar uma tarefa como "Concluída", alterando apenas o status).
* **DELETE (Deletar):** Usado quando queremos **remover** algo (ex: excluir uma tarefa).

### JSON (O Formato dos Dados)
As informações viajam entre o frontend e o backend no formato **JSON** (JavaScript Object Notation). Ele se parece com um objeto JavaScript:
```json
{
  "titulo": "Estudar Banco de Dados",
  "descricao": "Revisar comandos do MySQL",
  "id_status": 1
}
```

---

## 3. Estrutura de Pastas do Projeto

Nosso backend está organizado na pasta `backend` usando um padrão que separa as responsabilidades do código (baseado no padrão MVC/Service).

Abaixo está o papel de cada pasta e arquivo dentro de `backend/src`:

* 📂 **`config/`**
  * Contém configurações globais de serviços externos.
  * 📄 [db.js](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/src/config/db.js): Configura a conexão e inicializa o nosso banco de dados MySQL.
* 📂 **`routes/`**
  * É a "porta de entrada" das requisições. Define as URLs (endereços) que o frontend pode acessar.
  * 📄 [usuarioRoutes.js](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/src/routes/usuarioRoutes.js): Define rotas como `POST /api/usuarios` (para cadastrar usuários).
  * 📄 [tarefasRoutes.js](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/src/routes/tarefasRoutes.js): Define rotas como `GET /api/tarefas` (para listar) e `POST /api/tarefas` (para criar tarefas).
* 📂 **`controllers/`**
  * Recebe a requisição das rotas, valida se os dados enviados pelo usuário estão corretos (ex: se o título da tarefa não é vazio) e chama a lógica de negócio correspondente.
  * *Pense nele como o gerente que atende o cliente e diz se o pedido faz sentido.*
* 📂 **`services/`**
  * É onde a mágica acontece. Contém a lógica de negócio pura e o acesso direto ao banco de dados (as queries SQL para inserir, buscar ou atualizar registros).
  * *Pense nele como o cozinheiro que realmente prepara a comida.*
* 📂 **`middlewares/`**
  * São funções que rodam "no meio do caminho", antes de uma rota chegar ao controller. Servem para segurança, autenticação ou tratamentos de erros.
* 📂 **`utils/`**
  * Funções utilitárias auxiliares que podem ser reutilizadas em várias partes do projeto (ex: formatadores de data, validadores de CPF).
* 📄 [index.js](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/src/index.js)
  * É o ponto de partida do nosso servidor. Ele junta todas as rotas, ativa os frameworks necessários e coloca o servidor para rodar em uma porta específica (ex: 3000).

---

## 4. Frameworks e Bibliotecas Utilizadas

No arquivo [package.json](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/package.json), você verá as seguintes dependências instaladas:

1. **Express (`express`):**
   * É o nosso framework principal. Ele simplifica muito a criação de rotas, controle de requisições e respostas HTTP no Node.js. Sem ele, teríamos que escrever centenas de linhas de código puro para abrir um servidor básico.
2. **MySQL2 (`mysql2`):**
   * É o driver que permite ao Node.js se comunicar com o banco de dados MySQL. Ele traduz nossos comandos JavaScript em queries que o MySQL entende.
3. **Dotenv (`dotenv`):**
   * Carrega as configurações do arquivo `.env` para o código. Isso nos permite acessar informações confidenciais usando `process.env.NOME_DA_VARIAVEL`.
4. **CORS (`cors`):**
   * *Cross-Origin Resource Sharing*. Por padrão, navegadores bloqueiam sites de acessarem APIs em servidores diferentes (ex: o React rodando na porta 5173 acessando o Node na porta 3000). O CORS avisa ao backend que ele pode aceitar requisições vindas do nosso frontend.

---

## 5. O que é o arquivo `.env`?

O arquivo [`.env`](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/.env) (Variáveis de Ambiente) é onde guardamos configurações que variam de acordo com o computador ou que são sensíveis (como senhas do banco de dados).

> [!WARNING]
> **Nunca comite o arquivo `.env` no GitHub!** Ele contém senhas que devem ser mantidas privadas para segurança do projeto.

Para os outros membros rodarem o projeto, nós deixamos o arquivo [`.env.example`](file:///c:/Users/luisg/OneDrive/Documents/GitHub/task-hub/backend/.env.example) versionado no Git. Ele serve como um modelo contendo as variáveis vazias. 

Para rodar o projeto localmente, cada membro deve:
1. Copiar o arquivo `.env.example`.
2. Renomear a cópia para `.env`.
3. Preencher com as informações do seu próprio MySQL local.

---

## 6. O Fluxo de uma Requisição (Passo a Passo)

Para entender como tudo se conecta, veja o fluxo de criação de uma tarefa:

```mermaid
graph TD
    A[Frontend: Clica em Criar Tarefa] -->|Envia POST com dados em JSON| B[backend/src/index.js]
    B -->|Encaminha para| C[backend/src/routes/tarefasRoutes.js]
    C -->|Aciona| D[backend/src/controllers/tarefasController.js]
    D -->|Valida os dados e chama| E[backend/src/services/tarefasService.js]
    E -->|Executa Query SQL| F[(Banco de Dados MySQL)]
    F -->|Retorna Resultado| E
    E -->|Retorna os dados da tarefa| D
    D -->|Responde HTTP 201 Created| A
```

1. **Frontend:** O usuário digita o título da tarefa no React e clica em salvar. O React faz uma requisição `POST http://localhost:3000/api/tarefas` contendo os dados da tarefa.
2. **Servidor (index.js):** Recebe o POST e passa para o roteador de tarefas.
3. **Rota (tarefasRoutes.js):** Vê que é um `POST` no caminho `/` e chama a função `criarTarefa` no controller.
4. **Controller (tarefasController.js):** Verifica se todos os campos obrigatórios estão preenchidos. Se estiver tudo certo, chama a função de serviço.
5. **Serviço (tarefasService.js):** Recebe os dados, formata as datas no padrão do MySQL, e executa a query `INSERT INTO tarefas...`.
6. **Banco de Dados:** Grava os dados fisicamente.
7. **Retorno:** O serviço avisa o controller que deu certo, e o controller responde ao frontend com o status `201` (Criado com sucesso), permitindo ao React atualizar a lista na tela.
