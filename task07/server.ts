import express from 'express';
import mongoose from 'mongoose';
import { handleErrorMiddleware } from './error/middlewares';
import { AppError } from './error/appError';
import { HttpStatusCode } from './error/statusCode';
import globalRoute from '../task06/routes/global.route';

const PORT = 8000;
const uri: string =
  'mongodb://root:nodegmp@127.0.0.1:27017/mydatabase?authSource=admin';

const app = express();
app.use(express.json());
app.use('/api', globalRoute);

app.all('*', (req, res, next) => {
  return next(new AppError('There is no such route', HttpStatusCode.NOT_FOUND));
});
mongoose
  .connect(uri)
  .then(() => {
    console.log('Succesfully connected to MongoDB');
  })
  .catch((error: Error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log('Server is started');
});
