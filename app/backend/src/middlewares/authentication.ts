import { Request, Response, NextFunction, RequestHandler } from 'express';
import { tokenValidation } from '../auth';
import Payload from '../interfaces/ILoginPayload';
import { log } from 'console';

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        tokenValidation(authorization as string);

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authorization;