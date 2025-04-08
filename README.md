```markdown
# 📝 To-Do App Full Stack

Este é um projeto full stack de uma aplicação de gerenciamento de tarefas com autenticação de usuários, desenvolvido como teste técnico.

---

## 🚀 Tecnologias Utilizadas

### 📦 Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (Autenticação)
- Docker

### 💻 Frontend
- React
- Bootstrap 5
- Framer Motion
- Styled Components

---

## ✅ Pré-requisitos

Para rodar o projeto localmente, é necessário ter as seguintes ferramentas instaladas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Funcionalidades

- Registro e login de usuários
- Autenticação segura com JWT
- Criação, listagem, edição, conclusão e exclusão de tarefas
- Descrição opcional para cada tarefa
- Filtro de tarefas por status
- Design responsivo com modo escuro/claro
- Frases motivacionais aleatórias traduzidas para português
- Docker para facilitar a execução do ambiente

---

## 🐳 Como rodar com Docker

### 1. Clone o repositório

```bash
git clone https://github.com/Davilosoas/todo-list.git
cd todo-list
```

### 2. Crie um arquivo `.env` na raiz do backend

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/todo_db
JWT_SECRET=sua_chave_secreta
```

### 3. Crie um arquivo `.env` na raiz do frontend

```env
REACT_APP_API_URL=http://localhost:5000
```


### 4. Suba os containers

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000  
- Backend: http://localhost:5000



## 📁 Estrutura do Projeto (resumida)

```txt
backend/
├── controllers/
├── routes/
├── prisma/
├── middleware/
├── .env
├── index.js
frontend/
├── src/
│   ├── components/
│   ├── api/
│   └── App.js
docker-compose.yml
```

---

## 👨‍💻 Autor

Desenvolvido por **Davi Lopes** – [https://www.linkedin.com/in/davils](https://www.linkedin.com/in/davils)

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
