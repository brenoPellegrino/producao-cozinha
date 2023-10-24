import { Response, Request, Router } from "express";
import UsersController from "../controllers/UsersController";
import { authorization, validateCreateUserRequest, validateLoginRequest } from "../middlewares"

const router = Router();
const userController = new UsersController();

router.get('/',
authorization,
(req: Request, res: Response) => userController.findAll(req, res));

router.post('/login',
validateLoginRequest,
(req: Request, res: Response) => userController.login(req, res));

router.post('/', 
validateCreateUserRequest, 
(req: Request, res: Response) => userController.createUser(req, res));


router.put('/',
authorization, 
(req: Request, res: Response) => userController.editUser(req, res));

router.put('/:id',
authorization, 
(req: Request, res: Response) => userController.editUserById(req, res));

router.delete('/',
authorization,
(req: Request, res: Response) => userController.deleteUser(req, res));

export default router;