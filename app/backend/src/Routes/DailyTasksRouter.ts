import { Response, Request, Router } from "express";
import DailyTasksController from "../controllers/DailyTasksController";
import { authorization, validateUpdateTaskStatusRequest, validateCreateDailyTaskRequest, validateUpdateDailyTaskRequest } from "../middlewares";

const router = Router();
const dailyTasksCotroller = new DailyTasksController();

router.get('/',
(req: Request, res: Response) => dailyTasksCotroller.findAll(req, res)
);

router.post('/',
authorization,
validateCreateDailyTaskRequest,
(req: Request, res: Response) => dailyTasksCotroller.create(req, res)
);

router.put('/',
authorization,
validateUpdateTaskStatusRequest,
(req: Request, res: Response) => dailyTasksCotroller.toggleFinished(req, res)
);

router.patch('/',
authorization,
validateUpdateDailyTaskRequest,
(req: Request, res: Response) => dailyTasksCotroller.update(req, res)
);

export default router;