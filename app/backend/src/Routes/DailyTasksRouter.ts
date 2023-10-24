import { Response, Request, Router } from "express";
import DailyTasksController from "../controllers/DailyTasksController";
import { authorization, validateUpdateTaskRequest, validateCreateTaskRequest, validateCreateDailyTaskRequest } from "../middlewares";

const router = Router();
const dailyTasksCotroller = new DailyTasksController();

router.get('/',
(req: Request, res: Response) => dailyTasksCotroller.findAll(req, res)
);

router.get('/today-tasks',
(req: Request, res: Response) => dailyTasksCotroller.findAllByDay(req, res)
);

router.get('/:date',
(req: Request, res: Response) => dailyTasksCotroller.findAllByDay(req, res)
);

router.post('/',
authorization,
validateCreateDailyTaskRequest,
(req: Request, res: Response) => dailyTasksCotroller.create(req, res)
);

export default router;