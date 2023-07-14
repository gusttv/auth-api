## Instalação

1. Clone o repositório: `git clone https://github.com/gusttv/auth-api.git`
2. Faça a instalação das depêndencias: `npm ou yarn install`
3. Configure as variáveis de ambiente: crie sua configruação `.env`
4. inicie o projeto: `npm ou yarn start`


## Utilização

Endpoints:

- `POST api/auth/register`: criação de um novo usuário
- `POST api/auth/login`: Autenticação de um usuário existente
- `PUT api/auth/user`: altera nome e senha do usuário (necessita de autenticação)

