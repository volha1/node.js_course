import express from 'express';
import productRouter from './routes/product.route';
import cartRouter from './routes/cart.route';
import { handleError } from './controller/error.controller';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

app.use(handleError);

app.listen(PORT, () => {
  console.log('Server is started');
});
