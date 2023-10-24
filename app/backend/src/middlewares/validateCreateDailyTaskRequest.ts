import { Request, Response, NextFunction, RequestHandler } from 'express';
import createDailyTaskSchema from '../schemas/tasks/createDailyTaskSchema';

const validateCreateDailyTaskRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = createDailyTaskSchema.validate(req.body);

    if (isValid.error) return res.status(400).json({ message: isValid.error.message });

    next();
}

export default validateCreateDailyTaskRequest;