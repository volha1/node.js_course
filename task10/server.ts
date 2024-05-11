import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Socket } from 'net';
import morgan from 'morgan';
import { handleErrorMiddleware } from './error/middlewares';
import { AppError } from './error/appError';
import { HttpStatusCode } from './error/statusCode';
import globalRoute from '../task10/routes/global.route';
import logger from './logger/logger';
import { IS_DEV_ENV } from '../config';

dotenv.config();

const PORT = process.env.PORT || 8000;
const URI: string = process.env.MONGO_DB || '';

const app = express();
app.use(express.json());

if (IS_DEV_ENV) {
  app.use(morgan('[:date] INFO :method :url - :response-time ms'));
}

mongoose
  .connect(URI)
  .then(() => {
    logger.info('Succesfully connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('Error connecting to MongoDB', { metadata: error.message });
  });

app.get('/api/health', (req, res) => {
  const { readyState } = mongoose.connection;

  if (readyState === 0) {
    res.status(500).send();
  }
  res.status(200).send();
});

app.use('/api', globalRoute);
app.all('*', (req, res, next) => {
  return next(new AppError('There is no such route', HttpStatusCode.NOT_FOUND));
});

app.use(handleErrorMiddleware);

const server = app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

let connections: Socket[] = [];

server.on('connection', (connection) => {
  connections.push(connection);

  connection.on('close', () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

function shutdown() {
  logger.info('Received kill signal, shutting down gracefully');

  server.close(() => {
    logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, 20000);

  connections.forEach((connection) => connection.end());

  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
