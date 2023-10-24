import { Request, Response, NextFunction, RequestHandler } from 'express';
import updataTaskSchema from '../schemas/tasks/updateTaskSchema';

const validateCreateTaskRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = updataTaskSchema.validate(req.body);

    if (isValid.error) return res.status(400).json({ message: isValid.error.message });

    next();
}

export default validateCreateTaskRequest;