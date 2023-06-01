# RF _requisitos funcionais_

- [x] O usuário deve poder criar uma nova transação
- [x] O usuário deve obter um resumo da sua conta
- [x] O usuário deve poder listar todas as transações que já ocorreram
- [x] O usuário deve poder visualizar uma transação única

# RN _regras de Negócio_

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que irá subtrair o valor total.
- [x] Deve ser possível indentificar o usuário entre as requisições
- [x] O usuário só pode visualizar transações que ele criou

# RNF _requisitos não funcionais_

-

# Tipos de testes

- Unitários
- Integração
- E2E ( ponta a ponta )

  **Essa aplicação possui testes E2E**

## ferramentas utilizadas para testes

- Vitest -D
- supertest -D

# Deploy Render
[backend](https://ignite-api-nodejs-transactions.onrender.com/)

 ## Rotas
  - "/transactions"
    - [POST] = Cria uma transação. _obs: na primeiro POST a sessão é iniciada_
    - [GET] = Lista todas as transações da sessão
  - "/transactions/:id"
  Retorna apenas uma transação com o mesmo id passado pelo parâmetro 
  - "/transactions/summary"
  Resumo das transações criadas durante a sessão


