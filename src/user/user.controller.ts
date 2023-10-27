import express from 'express';
import { findAllUsers } from './user.service';

export const userRouter = express.Router();

userRouter.get('/users', async (req, res) => {
  const users = await findAllUsers();

  res.json({ message: users });
});
