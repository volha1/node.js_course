import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME,
  entities: ['task08/repository/entity/*.entity.ts'],
  migrations: ['task08/repository/migration/*.ts'],
  migrationsRun: true,
});

export default dataSource;
