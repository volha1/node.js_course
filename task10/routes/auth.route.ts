import express from 'express';
import { signup, login } from '../controller/auth.controller';

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);

export default router;
