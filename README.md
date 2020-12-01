# Market Express
Mini projeto de marketplace da iniciativa de atualizações de stacks da EJCM.

# Montando o projeto
Criamos uma pasta para o projeto e como utilizaremos apenas o back-end, na pasta raíz do projeto, com o Git Bash utilizamos o comando "npm init". 
Em seguida, o comando npm install express --save (para incluir na lista de dependendências). 

Após instalar o Express, criei a pasta src e inclui as subpastas: controllers, models, middlewares, database. Optei por criar o arquivo server.ts na pasta raíz, 
para rodar o Express.

Uma das recomendações importantes que eu recebi foi que, por questões de seguranças o arquivo server.ts não deve ser chamado de "server" ou de "app".

Feito isso, durante a escolha de ORM, tivemos alguns problemas em relação ao TypeORM que não vamos entrar muito em detalhes mas acabamos optando pelo Sequelize e utilizamos 
a versão mais recente, feito exclusivamente para o TypeScript. Dentro da pasta database, vocês poderão encontrar o arquivo de configuração do Sequelize. 

O Banco de Dados funciona da seguinte maneira: temos a rota /startDb que é responsável por atuar como uma migration, ou seja, toda vez que essa rota é acessada ela fará o papel de limpar o conteúdo no banco de dados e reiniciá-lo.

Para o nodemailer, optamos em utilizar um serviço de e-mail chamado mailtrap, que realiza envio de e-mails fakes somente para visualização e testes de HTML para as mensagens. Um ponto muito positivo do nodemailer na nossa opinião é que, o desenvolvedor tem o livre arbítrio de trabalhar da maneira que prefirir com o HTML para a mensagem que será enviada.

No arquivo tsconfig.js, por questões de melhoria na perfomance do TypeScript, optamos por utilizar o ECMA Script 2017 (a configuração do campo "target").

Após isso, no arquivo package.json, crie um campo "scripts" abaixo de main e adicione essa linha:

"dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"

O campo "dev" você pode alterar para o que quiser, quando for rodar o servidor no seu terminal, o comando será: **npm run dev ou o nome que colocou**.



# Comandos
- **npm init** - Inicia o projeto
- **npm install** - É de suma importância utilizar esse comando quando mergear com alguma outra branch que tenha feito alterações no package.json.
- **npm install express --save** - Instala e salva o projeto na lista de dependências
- **npm install @types/express** - Atualiza a tipagem do Express para TypeScript, permitindo que quando escrever o Express em TypeScript o editor de texto (utilizo VSCode),
possa reconhecer com mais facilidade o que contém nos módulos do Express.
- **npm install typescript -D** - Instala o TypeScript como uma dependência de desenvolvimento.
- **npm install --save sqlite3** - Instala o banco de dados SQLite.
- **npm install --save sequelize** - Instala o Sequelize, ORM para escrever o banco de dados no Express.
- **npm install --save sequelize-typescript** - Moderniza o Sequelize para o TypeScript
- **npm install bcrypt** - Instala a biblioteca de criptografia para o sistema de autenticação
- **npm install jsonwebtoken** - Modelo de Token que será enviado para um usuário conectado no servidor
- **npm install faker** - Modulo de geração de dados falsos (para seedar o bd)
- **npx -p typescript tsc --init** - Gera o arquivo "tsconfig.js", responsável por todas as configurações do TypeScript no projeto.
- **npm install nodemailer** - Biblioteca responsável pelos serviços de envio de e-mail.
- **npm install multer** - Biblioteca responsável pelos serviços de armazenamento de arquivos (majoritariamente estruturado em nosso projeto para imagens)
- **npm install cors** - Middleware responsável para permitir ou restringir resources requisitadas por um HTTP externo.
- **npm run dev** - Inicia o servidor.


# Links
- [Documentação - Express](https://expressjs.com)
- [Documentação - Sequelize](https://sequelize.org/master/manual/getting-started.html)
- [Documentação - Sequelize CLI TypeScript](https://www.npmjs.com/package/sequelize-cli-typescript)
- [Documentação - Nodemailer](https://nodemailer.com/about/)
- [Documentação - CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [Fazendo upload com a biblioteca multer](https://medium.com/@thihenos/node-usando-multer-para-fazer-upload-de-arquivos-em-5-passos-9ca33a7cf2ec)

# Autores
Projeto desenvolvido por [Nathan Andrade](https://github.com/andradenathan) e [Gabriel Cunha](https://github.com/GabrielCunha105).



