import { Response, Request } from "express";
import UsersService from "../services/UsersService";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";
import { ADMIN, INACTIVE, INTERNAL_ERROR, OK } from "../helpers/mapStrings";

export default class UsersController {
    private userService = new UsersService ();

    async findAll(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const decoded = tokenValidation(authorization as string);

        const { accType } = decoded;

        if(accType !== ADMIN) return res.status(401).json({ message: 'You do not have permission to execute this action' });

        const users = await this.userService.findAll();

        if(users.status !== OK) return res.status(mapStatusHTTP(users.status)).json(users.data);

        return res.status(200).json(users);
    }

    async findMyUser(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const decoded = tokenValidation(authorization as string);

        const { userId, accType } = decoded;

        const data = { userId, accType };

        if(!userId) return res.status(mapStatusHTTP(INTERNAL_ERROR)).json("Internal error");

        return res.status(200).json(data);
    }

    async createUser(req: Request, res: Response): Promise<Response>{
        const response = await this.userService.createUser(req.body);

        if(response.status !== OK) return res.status(mapStatusHTTP(response.status)).json(response.data);

        return res.status(201).json({ token: response.data });
    }

    async login(req: Request, res: Response): Promise<Response>{
        const response = await this.userService.login(req.body);

        if(response.status !== OK) return res.status(mapStatusHTTP(response.status)).json(response.data);
        
        return res.status(200).json({ token: response.data });
    }

    async editUser(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const decoded = tokenValidation(authorization as string);

        const { userId, accType, accStatus } = decoded;

        if(accStatus === INACTIVE) return res.status(401).json({ message: 'User inactive' });

        if (accType === ADMIN) {
            const user = await this.userService.editUser(Number(userId), req.body);

            if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);

            return res.status(200).json(user);
        }

        const user = await this.userService.editUser(Number(userId), req.body);

        if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);

        return res.status(200).json(user);
    }

    async editUserById(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const { id } = req.params;
        const decoded = tokenValidation(authorization as string);

        const { accType } = decoded;

        if(accType !== ADMIN) return res.status(401).json({ message: "You do not have permission to execute this action" });

        const user = await this.userService.editUser(Number(id), req.body);

        if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);

        return res.status(200).json(user);
    }

    async deleteUser(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const decoded = tokenValidation(authorization as string);

        const { userId, accType, accStatus } = decoded;

        if(accStatus === INACTIVE) return res.status(401).json({ message: 'Unauthorized' });

        if (accType === ADMIN) {
            const user = await this.userService.deleteUser(Number(userId));

            if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);

            return res.status(200).json(user);
        }


        const user = await this.userService.deleteUser(Number(userId));

        if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);
        
        return res.status(200).json(user);

    }

    async deleteUserById(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const { id } = req.params;

        const { accType } = tokenValidation(authorization as string);

        if(accType !== ADMIN) return res.status(401).json({ message: 'You do not have permission to execute this action' });

        const user = await this.userService.deleteUser(Number(id));

        if(user.status !== OK) return res.status(mapStatusHTTP(user.status)).json(user.data);
        
        return res.status(200).json(user);
    }
}