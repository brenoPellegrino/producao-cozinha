import { Request, Response, NextFunction, RequestHandler } from 'express';
import createTaskSchema from '../schemas/tasks/createTaskSchema';

const validateCreateTaskRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = createTaskSchema.validate(req.body);

    if (isValid.error) return res.status(400).json({ message: isValid.error.message });

    next();
}

export default validateCreateTaskRequest;