import { ServiceResponse } from "../interfaces/ServiceResponse";
import ITask from "../interfaces/ITask";
import TasksModel from "../models/TasksModel";

export default class TasksService {
    private taskModel = new TasksModel();

    async findAll(): Promise<ServiceResponse<ITask[]>>{
        try {
            const tasks = await this.taskModel.findAll();
            
            return { status: 'successful', data: tasks }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'notFound', data: { message } };
        }
    }

    async create(newTask: ITask): Promise<ServiceResponse<ITask>>{
        try {
            const task = await this.taskModel.create(newTask);
            
            return { status: 'successful', data: task }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'internalError', data: { message } };
        }
    }

    async update(id: number, newTask: ITask): Promise<ServiceResponse<ITask>>{
        try {
            const task = await this.taskModel.update(id, newTask);
            
            return { status: 'successful', data: task }; 
        } catch (error) {
            const { message } = error as Error;

            if(message === 'No tasks found') return { status: 'notFound', data: { message } };

            return { status: 'internalError', data: { message } };
        }
    }

}