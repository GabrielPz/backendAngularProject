import { Router } from 'express';
import * as usersController from '../controllers/api-users';

const userRoutes = Router();

userRoutes.get('/users', usersController.login);

export default userRoutes;