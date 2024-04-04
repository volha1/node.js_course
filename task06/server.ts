import express from 'express';
import globalRoute from './routes/global.route';
import { handleErrorMiddleware } from './errors/middlewares';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use('/api', globalRoute);

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log('Server is started');
});
