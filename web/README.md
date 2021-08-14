# Gerência de Configuração e Evolução de Software

Esse é o código para a aplicação Web da Students API.

## Tecnologias

API escrita em Typescript, utilizando o framework NextJS, que implementa a biblioteca ReactJS.

## Estrutura

- **src:** Pasta contendo arquivos de código fonte da aplicação
  - **pages:** Pasta contendo as rotas básicas do app. Cada arquivo representa uma possível rota no site
  - **services:** Pasta contendo definição base do **axios**, responsável por fazer a conexão entre no app e nossa API
  - **styles:** Pasta contendo o **CSS** para estilização das páginas
  - **types:** Pasta contendo definição de tipos da aplicação

## Setup

Para execução da aplicação é necessário ter o `NodeJS` instalado, seja por meio do [site oficial](https://nodejs.org/en/) ou por meio de um gestor de versões como o [NVM](https://github.com/nvm-sh/nvm)

Após ter o `NodeJS` instalado, rode o seguinte comando para instalar as dependências da aplicação.

```bash
  npm install
```

Duplique o arquivo `.env.example` e de o nome de `.env`. Nele, coloque as variáveis de ambiente conforme definidas no exemplo.

## Modo de desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento, execute a API segunindo as instruções em seu **README.md** e faça a seguinte modificação no `.env`

```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
```

E execute o seguinte comando

```bash
  npm run dev
```

A aplicação deverá iniciar na porta **3000**. Basta acessa-la [aqui](http://localhost:3000)

## Modo de produção

Para iniciar a aplicação em modo de produção, primeiro deve ser feita um **build** dela com o seguinte comando.

```bash
  npm run build
```

Após finalização do **build**, basta executar o app com o seguinte comando.

```bash
  npm start
```

A aplicação deverá iniciar na porta **3000**. Basta acessa-la [aqui](http://localhost:3000)

## Autor

- Aylton Almeida
