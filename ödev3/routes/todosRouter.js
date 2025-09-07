import { Router } from "express";
import {
  listTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo
} from "../controllers/todosController.js";
// controllerResponseHandler import'u kaldırıldı.
import { validate } from "../middleware/validation/validate.js";
import { 
  paramsSchema, 
  createTodoSchema, 
  updateTodoSchema, 
  patchTodoSchema,
  todoQuerySchema
} from "../middleware/validation/schemas.js";

const router = Router();


router.get("/", validate(todoQuerySchema), listTodos);
router.get("/:id", validate(paramsSchema), getTodoById);
router.post("/", validate(createTodoSchema), createTodo);
router.put("/:id", validate(paramsSchema.merge(updateTodoSchema)), updateTodo);
router.patch("/:id", validate(paramsSchema.merge(patchTodoSchema)), patchTodo);
router.delete("/:id", validate(paramsSchema), deleteTodo);

export default router;