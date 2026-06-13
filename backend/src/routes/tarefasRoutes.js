import { Router } from "express";
import * as tarefasController from "../controllers/tarefasController.js"

const router = Router();

// Rota para buscar tarefas
router.get('/', tarefasController.buscarTarefas)

// Rota para criação de tarefas
router.post('/', tarefasController.criarTarefa)

// Rota para edição de tarefas
router.put('/', tarefasController.editarTarefa)

// Rota para deleção de tarefas
router.delete('/:id_tarefa', tarefasController.deletarTarefa);

// Rota para restaurar tarefas
router.put('/:id_tarefa/restaurar', tarefasController.restaurarTarefa);

export default router;
