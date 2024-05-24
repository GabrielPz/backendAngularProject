import { Router } from 'express';
import * as usersController from '../controllers/api-users';

const userRoutes = Router();

// Rota para login
userRoutes.get('/users', usersController.login);

// Rota para criar um usuário
userRoutes.post('/users/register', usersController.createUser);

// Rota para listar todos os usuários
userRoutes.get('/users', usersController.getAllUsers);

// Rota para obter um usuário pelo ID
userRoutes.get('/users/:id', usersController.getUserById);

// Rota para atualizar um usuário pelo ID
userRoutes.put('/users/:id', usersController.updateUser);

// Rota para deletar um usuário pelo ID
userRoutes.delete('/users/:id', usersController.deleteUser);

export default userRoutes;
