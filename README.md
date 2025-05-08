# Furia Web Chat

Uma aplicação de chat em tempo real construída com React, Tailwind CSS, MongoDB, Socket.IO e uma API em JavaScript.

## Funcionalidades

- Autenticação de usuários (registro e login) com JSON Web Tokens e cookies
- Chat em tempo real com Socket.IO
- Upload e gerenciamento de imagens via Cloudinary
- Estados globais gerenciados com Zustand
- Chamadas HTTP com Axios
- Segurança de senhas com bcrypt
- Cross-Origin Resource Sharing (CORS)

## Tecnologias Utilizadas

- **Frontend**: React, Tailwind CSS, Axios, Zustand
- **Backend**: Node.js, Express, Socket.IO, CORS, bcrypt, jsonwebtoken, cookie-parser
- **Banco de Dados**: MongoDB
- **Serviços**: Cloudinary

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- MongoDB (instância local ou Atlas)
- Conta no Cloudinary

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Batss1/furia-web-chat.git
   cd furia-web-chat
   ```

2. Configuração das variáveis de ambiente:

   Crie um arquivo `.env` na raiz de cada pasta (`backend` e `frontend`) com as variáveis abaixo:

   ### Backend (`backend/.env`)

   ```ini
   PORT=5000
   MONGO_URI=sua_string_de_conexão_com_mongodb
   JWT_SECRET=seu_segredo_jwt
   CLOUDINARY_CLOUD_NAME=seu_cloud_name
   CLOUDINARY_API_KEY=sua_api_key
   CLOUDINARY_API_SECRET=sua_api_secret
   CLIENT_URL=http://localhost:3000
   ```

   ### Frontend (`frontend/.env`)

   ```ini
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Instale as dependências e inicie os servidores:

   ### Backend

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   O backend irá rodar em `http://localhost:5000`.

   ### Frontend

   ```bash
   cd frontend
   npm install
   npm start
   ```

   O frontend irá rodar em `http://localhost:3000`.

## Estrutura do Projeto

```
furia-web-chat/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── tailwind.config.js
│   ├── package.json
│   └── .env
└── .gitignore
```

## Endpoints da API

| Rota                   | Método | Descrição                         |
|------------------------|--------|-----------------------------------|
| `/api/auth/register`   | POST   | Registra um novo usuário          |
| `/api/auth/login`      | POST   | Autentica um usuário              |
| `/api/auth/logout`     | POST   | Logout (limpa cookie)             |
| `/api/users/me`        | GET    | Retorna dados do usuário logado   |
| `/api/messages`        | GET    | Lista mensagens do chat           |
| `/api/messages`        | POST   | Envia nova mensagem               |

## Eventos de Socket.IO

- **connection**: Conexão de um cliente
- **disconnect**: Desconexão de um cliente
- **chat message**: Envio de mensagem em tempo real
- **typing**: Indica que um usuário está digitando


