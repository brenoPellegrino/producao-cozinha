import { Request, Response, NextFunction, RequestHandler } from 'express';
import updateTaskStatus from '../schemas/tasks/updateTaskStatus';

const validateUpdateTaskStatusRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = updateTaskStatus.validate(req.body);

    if (isValid.error) return res.status(400).json({ message: isValid.error.message });

    next();
}

export default validateUpdateTaskStatusRequest;