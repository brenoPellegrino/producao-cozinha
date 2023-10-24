import { ServiceResponse } from "../interfaces/ServiceResponse";
import DailyTaskModel from "../models/DailyTaskModel";
import IDailyTask from "../interfaces/IDailyTask";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";

export default class TasksService {
    private dailyTaskModel = new DailyTaskModel();

    async findAll(): Promise<ServiceResponse<IDailyTask[]>>{
        try {
            const tasks = await this.dailyTaskModel.findAll();
            
            return { status: 'successful', data: tasks }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'notFound', data: { message } };
        }
    }

    async findAllByDay(searchDate?: string): Promise<ServiceResponse<IDailyTask[]>>{
        try {
            const tasks = await this.dailyTaskModel.findAllByDay(searchDate);
            
            return { status: 'successful', data: tasks }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'notFound', data: { message } };
        }
    }
    
    async create(dailyTask: IDailyTask, dailyAssociations: IDailyTaskAssociation[][]): Promise<ServiceResponse<IDailyTask>>{
        try {
            const task = await this.dailyTaskModel.create(dailyTask, dailyAssociations);
            
            return { status: 'successful', data: task }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'badRequest', data: { message } };
        }
    }

}