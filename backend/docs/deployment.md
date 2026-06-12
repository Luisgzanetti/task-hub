# Guia de Execução Local - TaskHub 🚀

Este guia descreve os passos necessários para configurar e executar localmente as aplicações frontend e backend do TaskHub em ambiente de desenvolvimento.

---

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* **Node.js** (versão LTS recomendada, ex: v20 ou superior)
* **MySQL Server** ativo e rodando
* Um gerenciador ou cliente de banco de dados (ex: **MySQL Workbench**)

---

## 🗄️ 1. Configuração do Banco de Dados

Antes de iniciar o backend, é necessário criar a estrutura do banco de dados MySQL local.

1. Abra o **MySQL Workbench** (ou o cliente SQL de sua preferência) e conecte-se ao seu servidor MySQL local (geralmente na porta `3306`).
2. Abra e execute o arquivo de script do projeto: [banco.sql](../backend/banco.sql).
3. A execução deste script criará automaticamente a base de dados `bancotaskhub` e as tabelas `usuarios`, `status` e `tarefas`, além de inserir os registros iniciais na tabela de `status`.

---

## ⚙️ 2. Configuração das Variáveis de Ambiente (`.env`)

As variáveis de ambiente devem ser configuradas nas pastas do backend e do frontend.

### Backend (`backend/.env`)
1. Acesse o diretório `backend/` do projeto.
2. Copie o arquivo `.env.example` e renomeie-o para `.env`.
3. Edite as variáveis conforme as configurações do seu banco MySQL local:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=seu_usuario_do_mysql
   DB_PASSWORD=sua_senha_do_mysql
   DB_NAME=bancotaskhub
   DB_PORT=3306
   ```

### Frontend (`frontend/.env`)
1. Acesse o diretório `frontend/` do projeto.
2. Copie o arquivo `.env.example` e renomeie-o para `.env`.
3. Verifique se o arquivo possui a seguinte variável apontando para o endereço de desenvolvimento do backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

---

## 🚀 3. Como Executar o Projeto

Para o correto funcionamento do TaskHub, é necessário executar tanto o servidor do backend quanto o do frontend simultaneamente.

### Executando o Backend
1. Abra um terminal na raiz do projeto e acesse o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale todas as dependências necessárias do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O backend estará acessível em `http://localhost:3000`.*

### Executando o Frontend
1. Abra um **segundo terminal** na raiz do projeto e acesse o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências necessárias do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor local de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
   *O terminal exibirá a porta local na qual o frontend está rodando (geralmente `http://localhost:5173`). Abra este endereço em seu navegador para utilizar o TaskHub.*
