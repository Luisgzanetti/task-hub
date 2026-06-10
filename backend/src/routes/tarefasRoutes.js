import { Router } from "express";
import * as tarefasController from "../controllers/tarefasController.js"

const router = Router();

// Rota para buscar tarefas
router.get('/', tarefasController.buscarTarefas)

// Rota para criação de tarefas
router.post('/', tarefasController.criarTarefa)

export default router;