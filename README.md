# Service Auth

## Descrição
API de autenticação segura utilizando Node.js, Express, MongoDB, JWT e bcrypt para hash de senhas.
API de autenticação segura utilizando Node.js, Express, MongoDB e JWT.

## Requisitos
- Node.js 18+
- MongoDB
- Docker (opcional)
- bcrypt para hash de senhas

## Instalação
Clone o repositório e instale as dependências:
```sh
git clone https://github.com/seu-repositorio/service-auth.git
cd service-auth
npm install
```

## Configuração
Crie um arquivo `.env` na raiz do projeto:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_db # Ajuste o URI se estiver rodando o MongoDB em um contêiner Docker ou servidor remoto
JWT_SECRET=sua_chave_secreta
```

## Executando o projeto
### Modo de desenvolvimento
```sh
npm run dev
```

### Modo de produção
```sh
npm start
```

## Usando Docker
Para rodar com Docker Compose:
```sh
docker-compose up --build
```

Para parar os contêineres:
```sh
docker-compose down
```

## Endpoints
- `POST /auth/register` - Registra um novo usuário
- `POST /auth/login` - Autentica um usuário

## Estrutura do Projeto
```
/service-auth
│── src/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│── .env
│── .gitignore
│── docker-compose.yml
│── package.json
│── README.md
│── server.js
```

## Licença
Este projeto está sob a licença ISC.
