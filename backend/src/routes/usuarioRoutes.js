import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = Router();

// Rota para login
router.post('/login', usuarioController.login);

// Rota para cadastro de usuário
router.post('/', usuarioController.cadastrar);

// Rota para atualizar dados do usuário
router.put('/', usuarioController.atualizarUsuario);

// Rota para deletar usuário
router.delete('/:id_usuario', usuarioController.deletarUsuario);

export default router;
