import { ServiceResponse } from "../interfaces/ServiceResponse";
import DailyTaskModel from "../models/DailyTaskModel";
import IDailyTask from "../interfaces/IDailyTask";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";
import { BAD_REQUEST, OK } from "../helpers/mapStrings";
import IUpdateDailyTask from "../interfaces/IUpdateDailyTask";
import IDailyTaskUpdateRequest from "../interfaces/IDailyTaskUpdateRequest";

export default class TasksService {
    private dailyTaskModel = new DailyTaskModel();

    async findByDate(date: string): Promise<ServiceResponse<IDailyTask[]>>{
        try {
            const tasks = await this.dailyTaskModel.findBydate(date);
            
            return { status: OK, data: tasks }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: 'notFound', data: { message } };
        }
    }

    
    async create(dailyTask: IDailyTask, dailyAssociations: IDailyTaskAssociation[][]): Promise<ServiceResponse<IDailyTask>>{
        try {
            const task = await this.dailyTaskModel.create(dailyTask, dailyAssociations);
            
            return { status: OK, data: task }; 
        } catch (error) {
            const { message } = error as Error;
            return { status: BAD_REQUEST, data: { message } };
        }
    }

    async toggleFinished(dailyTaskId: number, taskId: number, updatedAt: string): Promise<ServiceResponse<IDailyTask>>{
        try {
            const modelResponse = await this.dailyTaskModel.toggleFinished(dailyTaskId, taskId, updatedAt);

            return { status: OK, data: modelResponse };
        } catch (error) {
            const { message } = error as Error;
            return { status: BAD_REQUEST, data: { message } };
        }
    }

    async update(dailyTaskId: number, tasks: IDailyTaskAssociation[][]): Promise<ServiceResponse<IDailyTask>>{
        try{
            const modelResponse = await this.dailyTaskModel.update(dailyTaskId, tasks);

            return { status: OK, data: modelResponse };
        } catch (error) {
            const { message } = error as Error;
            return { status: BAD_REQUEST, data: { message } };
        }  
    }

}