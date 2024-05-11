import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import catchAsync from '../error/catchAsync';
import {
  userSignupSchema,
  userLoginSchema,
} from './validationSchema/user.schema';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import { fetchUser, createUser } from '../service/user.service';

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = userSignupSchema.validate(req.body);

    if (error) {
      return next(
        new AppError('User is not valid', HttpStatusCode.BAD_REQUEST)
      );
    }

    const user = await fetchUser(req.body.email);

    if (user) {
      return next(new AppError('User already exists', HttpStatusCode.CONFLICT));
    }

    const newUser = await createUser(req.body);

    res.send({ data: { user: newUser }, error: null });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const { value, error } = userLoginSchema.validate(req.body);

    if (error) {
      return next(
        new AppError('Login details are not valid', HttpStatusCode.BAD_REQUEST)
      );
    }

    const user = await fetchUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(
        new AppError('Invalid credentials', HttpStatusCode.BAD_REQUEST)
      );
    }

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY!,
      {
        expiresIn: '2h',
      }
    );

    res.send({ data: { token }, error: null });
  }
);
