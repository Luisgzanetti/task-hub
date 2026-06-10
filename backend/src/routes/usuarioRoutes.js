import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

// Rota para cadastro de usuário (POST /api/usuarios)
router.post('/', usuarioController.cadastrar);

export default router;
