import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from 'vitest';
import supertest from 'supertest';
import { app } from '../src/app';
// comando no terminal
import { execSync } from 'node:child_process';

describe('Transactions routes', () => {
  // Espera todos o backend ser carregado
  beforeAll(async () => {
    await app.ready();
  });

  // Apaga o banco de testes e inicia em seguida
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
  });
  // Fecha a aplicação
  afterAll(async () => {
    await app.close();
  });

  /* Testes */

  // test() or it()
  // O usuario deve poder criar uma nova transação
  test('user can create a new transaction', async () => {
    // chamada http - POST new transaction
    await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transactions',
        amount: 5000,
        type: 'credit',
      })
      .expect(201);
  });

  // deve ser possivel listar todas transações
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transactions',
        amount: 5000,
        type: 'credit',
      });
    const cookies = createTransactionResponse.get('Set-Cookie');

    const response = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Test Transactions',
        amount: 5000,
      }),
    ]);
  });

  // deve ser possivel obter uma transação especifica
  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transactions',
        amount: 5000,
        type: 'credit',
      })
      .expect(201);
    const cookies = createTransactionResponse.get('Set-Cookie');

    await supertest(app.server).get('/transactions').expect(401);

    const listTransactionsResponse = await supertest(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await supertest(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Test Transactions',
        amount: 5000,
      }),
    );
  });

  // deve ser possivel obter o resumo das transações
  it('should be able to get the summary', async () => {
    const createTransactionResponse = await supertest(app.server)
      .post('/transactions')
      .send({
        title: 'Test Transactions',
        amount: 5000,
        type: 'credit',
      });
    // guardas os cookies
    const cookies = createTransactionResponse.get('Set-Cookie');

    await supertest(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Test Transactions debit',
        amount: 2500,
        type: 'debit',
      });

    const summaryResponse = await supertest(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual(
      expect.objectContaining({
        amount: 2500,
      }),
    );
  });
});
