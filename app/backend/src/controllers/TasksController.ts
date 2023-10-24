import { Response, Request } from "express";
import UsersService from "../services/UsersService";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";
import TasksService from "../services/TasksService";
import ITasks from "../interfaces/ITask";

export default class TasksController {
    private tasksService = new TasksService();

    async findAll(_req: Request, res: Response): Promise<Response>{
        const tasks = await this.tasksService.findAll();

        if(tasks.status !== 'successful') return res.status(mapStatusHTTP(tasks.status)).json(tasks.data);

        return res.status(200).json(tasks);
    }

    async create(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;

        if(!authorization) return res.status(401).json({ message: 'Token not found' });

        const { userId, accType } = tokenValidation(authorization);

        if(accType !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

        if(!req.body.description) req.body.description = '';

        if(!req.body.obs) req.body.obs = '';

        const newTask = {
            ...req.body,
            createdBy: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ITasks; 

        const task = await this.tasksService.create(newTask);

        if(task.status !== 'successful') return res.status(mapStatusHTTP(task.status)).json(task.data);

        return res.status(201).json(task);
    }

    async update(req: Request, res: Response): Promise<Response>{
        const { authorization } = req.headers;
        const { taskToUpdate } = req.params;

        if(!authorization) return res.status(401).json({ message: 'Token not found' });

        const { userId, accType } = tokenValidation(authorization);

        if(accType !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

        const { taskId } = req.params;

        const newTask = {
            ...req.body,
            createdBy: userId,
            createdAt: new Date(),
        } as ITasks; 

        const task = await this.tasksService.update(Number(taskToUpdate), newTask);

        if(task.status !== 'successful') return res.status(mapStatusHTTP(task.status)).json(task.data);

        return res.status(200).json(task);
    }
}