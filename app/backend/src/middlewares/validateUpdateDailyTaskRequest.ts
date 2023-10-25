import { Request, Response, NextFunction, RequestHandler } from 'express';
import updateDailyTaskSchema from '../schemas/tasks/updateDailyTaskSchema';

const validateCreateDailyTaskRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = updateDailyTaskSchema.validate(req.body);

    if (isValid.error) return res.status(400).json({ message: isValid.error.message });

    next();
}

export default validateCreateDailyTaskRequest;