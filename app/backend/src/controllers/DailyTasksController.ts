import { Response, Request } from "express";
import { tokenValidation } from '../auth';
import mapStatusHTTP from "../helpers/mapStatusHTTP";
import DailyTasksService from "../services/DailyTasksService";
import IDailyTasksInput from "../interfaces/IDailyTasksCreationRequestInput";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";

export default class TasksController {
    private dailyTasksService = new DailyTasksService();

    async findAll(_req: Request, res: Response): Promise<Response>{
        const tasks = await this.dailyTasksService.findAll();

        if(tasks.status !== 'successful') return res.status(mapStatusHTTP(tasks.status)).json(tasks.data);

        return res.status(200).json(tasks);
    }

    async findAllByDay(_req: Request, res: Response): Promise<Response>{
        const searchDate = _req.params.date;
        const tasks = await this.dailyTasksService.findAllByDay(searchDate ? searchDate : undefined);

        if(tasks.status !== 'successful') return res.status(mapStatusHTTP(tasks.status)).json(tasks.data);

        return res.status(200).json(tasks);
    }

    async create(req: Request, res: Response): Promise<Response>{
        const token = req.headers.authorization;
        const { date, tasks } = req.body as IDailyTasksInput;
        
        if(!token) return res.status(401).json({ message: 'Token not found' });

        const { userId: creator, accType } = tokenValidation(token);

        if (accType !== 'admin') return res.status(401).json({ message: 'Unauthorized' });

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
            const dayAssociations = task.responsibleIds.map((responsible: number) => {
                return {
                    taskId: task.taskId,
                    responsibleId: responsible,
                    createdAt,
                    updatedAt: createdAt
                }
            });
            return dayAssociations;
        });

        const task = await this.dailyTasksService.create(dailyTask, dailyAssociations);

        if(task.status !== 'successful') return res.status(mapStatusHTTP(task.status)).json(task.data);

        return res.status(201).json(task);
    }
    
}