import { Response, Request, Router } from "express";
import TasksController from "../controllers/TasksController";
import { authorization, validateUpdateTaskRequest, validateCreateTaskRequest } from "../middlewares";

const router = Router();
const taskController = new TasksController();

router.get('/',
authorization,
(req: Request, res: Response) => taskController.findAll(req, res)
);

router.post('/',
authorization,
validateCreateTaskRequest,
(req: Request, res: Response) => taskController.create(req, res)
);

router.put('/:taskToUpdate',
authorization,
validateUpdateTaskRequest,
(req: Request, res: Response) => taskController.update(req, res)
);

export default router;