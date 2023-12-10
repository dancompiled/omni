import express from 'express';
import { createUser, deleteUser, findAllUsers, updateUser } from './user.service';

export const userRouter = express.Router();

userRouter.get('/users', async (_, res) => {
  const users = await findAllUsers();

  res.json({ message: users });
});

userRouter.post('/users', async (_, res) => {
  const users = await createUser();

  res.json({ message: users });
});

userRouter.put('/users/:id', async (_, res) => {
  const users = await updateUser();

  res.json({ message: users });
});

userRouter.delete('/users/:id', async (_, res) => {
  const users = await deleteUser();

  res.json({ message: users });
});
