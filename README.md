# people-api
Simple express rest API with mongoose. Created in order to alow CRUD operations in person objects with many types of contacts in it.

### Considerações

Na criação da API, optou-se por usar o banco de dados NoSQL mondoDB. 
Devido à natureza mais orientada à aplicação desse tipo de banco, no momento de criar os schemas das pessoas 
e contatos, imaginei que os contatos estariam sempre atrelados ao contexto de uma pessoa, como em uma página
em que se pode adicionar múltiplos contatos dinamicamente. A quantidade de contatos de uma pessoa, considerou-se
de tamanho irrelevante, não considerando danoso à performance operações de update do documento
estarem sempre atrelados à pessoa.

Na aplicação também procurou-se reproduzir configuração diferentes para os ambientes de desenvolvimento e testes.

Considerando a limitação de tempo, muitas validações deixaram de ser feitas, mas procurou-se de maneira geral demonstrar
conhecimento, através de técnicas diferentes na utilização do mongoose.

Não houve muita atenção à segurança da API,foi adicionado o pacote helmet como indicação de lembrança.

Como título de demonstração, criou-se testes para validação da criação de pessoas via API.

### Setup

versão mongoDB rodando em minha máquina:3.0.3
versão Node em minha máquina:6.2.0

Rodando em development
1. npm install
2. mongod
3. npm run dev

Rodando testes:
1. npm install
2. mongod
3. npm run test-server
4. npm test
