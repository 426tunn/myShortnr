import express from 'express';
import { register, login, logOut } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logOut)

export default userRouter;
