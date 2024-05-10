import express from 'express';
import dotenv from 'dotenv';
import { handleErrorMiddleware } from './error/middlewares';
import { AppError } from './error/appError';
import { HttpStatusCode } from './error/statusCode';
import globalRoute from '../task08/routes/global.route';
import dataSource from './repository/datasource/dataSource';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use('/api', globalRoute);

app.all('*', (req, res, next) => {
  return next(new AppError('There is no such route', HttpStatusCode.NOT_FOUND));
});

dataSource
  .initialize()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err: Error) => {
    console.error(`Error connecting to PostgreSQL: ${err}`);
  });

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log('Server is started');
});
