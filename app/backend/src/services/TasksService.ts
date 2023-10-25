import { ServiceResponse } from "../interfaces/ServiceResponse";
import ITask from "../interfaces/ITask";
import TasksModel from "../models/TasksModel";
import { INTERNAL_ERROR, NOT_FOUND, NO_TASKS_FOUND, OK } from "../helpers/mapStrings";

export default class TasksService {
    private taskModel = new TasksModel();

    async findAll(): Promise<ServiceResponse<ITask[]>>{
        try {
            const tasks = await this.taskModel.findAll();
            
            return { status: OK, data: tasks }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: NOT_FOUND, data: { message } };
        }
    }

    async create(newTask: ITask): Promise<ServiceResponse<ITask>>{
        try {
            const task = await this.taskModel.create(newTask);
            
            return { status: OK, data: task }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: INTERNAL_ERROR, data: { message } };
        }
    }

    async update(id: number, newTask: ITask): Promise<ServiceResponse<ITask>>{
        try {
            const task = await this.taskModel.update(id, newTask);
            
            return { status: OK, data: task }; 
        } catch (error) {
            const { message } = error as Error;

            if(message === NO_TASKS_FOUND) return { status: NOT_FOUND, data: { message } };

            return { status: INTERNAL_ERROR, data: { message } };
        }
    }

}