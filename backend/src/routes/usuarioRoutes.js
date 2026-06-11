import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

// Rota para login
router.post('/login', usuarioController.login);

// Rota para cadastro de usuário
router.post('/', usuarioController.cadastrar);

export default router;
