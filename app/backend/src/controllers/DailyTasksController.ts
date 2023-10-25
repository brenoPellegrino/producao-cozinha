import { Response, Request } from "express";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";
import DailyTasksService from "../services/DailyTasksService";
import IDailyTasksInput from "../interfaces/IDailyTasksCreationRequestInput";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";
import { ADMIN, OK, STRING } from "../helpers/mapStrings";
import IUpdateDailyTask from "../interfaces/IUpdateDailyTask";

export default class TasksController {
    private dailyTasksService = new DailyTasksService();

    async findAll(req: Request, res: Response): Promise<Response>{
        const { date } = req.body;

        if (typeof date !== STRING) return res.status(400).json({ message: 'Invalid date' });

        const tasks = await this.dailyTasksService.findByDate(date);

        if(tasks.status !== OK) return res.status(mapStatusHTTP(tasks.status)).json(tasks.data);

        return res.status(200).json(tasks);
    }


    async create(req: Request, res: Response): Promise<Response>{
        const token = req.headers.authorization;
        const { date, tasks } = req.body as IDailyTasksInput;
        
        if(!token) return res.status(401).json({ message: 'Token not found' });

        const { userId: creator, accType } = tokenValidation(token);

        if (accType !== ADMIN) return res.status(401).json({ message: 'Unauthorized' });

        const now = new Date();

        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();

        const createdAt = `${ano}-${mes}-${dia}`;

        const dailyTask = {
            dailyTaskId: 0,
            date,
            createdBy: creator,
            createdAt,
            updatedAt: createdAt
        };

        const dailyAssociations = tasks.map((task) => {
            if (task.responsibleIds.length === 0) task.responsibleIds.push(1);
            const dayAssociations = task.responsibleIds.map((responsible: number) => {
                return {
                    taskId: task.taskId,
                    responsibleId: responsible,
                    isFinished: false,
                    createdAt,
                    updatedAt: createdAt
                }
            });
            return dayAssociations;
        });

        const task = await this.dailyTasksService.create(dailyTask, dailyAssociations);

        if(task.status !== OK) return res.status(mapStatusHTTP(task.status)).json(task.data);

        return res.status(201).json(task);
    }

    async toggleFinished(req: Request, res: Response): Promise<Response>{
        const token = req.headers.authorization;
        const { dailyTaskId, taskId } = req.body;
        
        if(!token) return res.status(401).json({ message: 'Token not found' });

        const { accType } = tokenValidation(token);

        if (accType !== ADMIN) return res.status(401).json({ message: 'Unauthorized' });

        const now = new Date();

        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();

        const updatedAt = `${ano}-${mes}-${dia}`;

        const serviceResponse = await this.dailyTasksService.toggleFinished(dailyTaskId, taskId, updatedAt);

        if(serviceResponse.status !== OK) return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);

        return res.status(200).json(serviceResponse);
    }

    async update(req: Request, res: Response): Promise<Response>{
        const token = req.headers.authorization;
        const { dailyTaskId, tasks } = req.body as IUpdateDailyTask;
        
        if(!token) return res.status(401).json({ message: 'Token not found' });

        const { accType } = tokenValidation(token);

        if (accType !== ADMIN) return res.status(401).json({ message: 'Unauthorized' });

        const now = new Date();

        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();

        const updatedAt = `${ano}-${mes}-${dia}`;

        const dailyAssociations = tasks.map((task) => {
            if (task.responsibleIds.length === 0) task.responsibleIds.push(1);
            const dayAssociations = task.responsibleIds.map((responsible: number) => {
                return {
                    taskId: task.taskId,
                    responsibleId: responsible,
                    updatedAt: updatedAt
                }
            });
            return dayAssociations as IDailyTaskAssociation[];
        });

        const ServiceResponse = await this.dailyTasksService.update(dailyTaskId, dailyAssociations);

        if(ServiceResponse.status !== OK) return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);

        return res.status(200).json(ServiceResponse);
    };
    
}