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
De grosso modo, como estávamos muito animados para aprender novas coisas o mais rápido possível, acabamos fazendo apenas uma função para conectar com o banco de dados na memória
e, então, sempre que iniciarmos o servidor, precisamos utilizar a rota /sync e iniciar todo o fluxo do projeto do zero.

Toda vez que sincronizado com o servidor pela rota, o banco de dados também se inicia, então é importante checar o seu Bash para saber se não deu erro de conexão.

Isto é algo que estamos pesquisando para melhorar em breve.

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
- **npm run dev** - Inicia o servidor.


# Links
- [Documentação - Express](https://expressjs.com)
- [Documentação - Sequelize](https://sequelize.org/master/manual/getting-started.html)
- [Documentação - Sequelize CLI TypeScript](https://www.npmjs.com/package/sequelize-cli-typescript)

# Autores
Projeto desenvolvido por [Nathan Andrade](https://github.com/andradenathan) e [Gabriel Cunha](https://github.com/GabrielCunha105).



