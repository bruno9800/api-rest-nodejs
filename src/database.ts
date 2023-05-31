import setupKnex, { Knex } from 'knex';

import { env } from './env';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL,
    // só um arquivo, pois o sqlite armazena os dados em um arquivo
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

const knex = setupKnex(config);

export { config, knex };
