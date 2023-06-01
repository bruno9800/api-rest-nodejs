import setupKnex, { Knex } from 'knex';

import { env } from './env';

const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
          // só um arquivo, pois o sqlite armazena os dados em um arquivo
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

const knex = setupKnex(config);

export { config, knex };
