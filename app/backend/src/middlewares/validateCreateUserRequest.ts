import { Request, Response, NextFunction, RequestHandler } from 'express';
import createLoginSchema from '../schemas/user/createUserSchema';
import validateCpfCnpj from '../helpers/validateCpfCnpj';

const validateCreateUserRequest: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isValid = createLoginSchema.validate(req.body);

    if (isValid.error) {
        return res.status(400).json({ message: isValid.error.message });
    }

    next();
}

export default validateCreateUserRequest;