import { Router } from "express";
import {
  listUsers,
  getUserTodos,
  createUser
} from "../controllers/usersController.js";

import { validate } from "../middleware/validation/validate.js";
import { createUserSchema, paramsSchema } from "../middleware/validation/schemas.js";

const router = Router();


router.post("/", validate(createUserSchema), createUser);
router.get("/", listUsers);
router.get("/:id/todos", validate(paramsSchema), getUserTodos);

export default router;