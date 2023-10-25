import ITask from "../interfaces/ITask";
import SequelizeTasks from "../database/models/SequelizeTasks";
import SequelizeDailyTasks from "../database/models/SequelizeDailyTasks";
import { NO_TASKS_CREATED, NO_TASKS_FOUND, NO_TASKS_UPDATED, TASKS_DELETED } from "../helpers/mapStrings";

export default class TasksModel {
    private sequelizeTasks = SequelizeTasks;

    async findAll(): Promise<ITask[]> {
      const dbData = await this.sequelizeTasks.findAll({
        include: [{
          association: 'creator',
          attributes: ['name']
        }],
        });
      if (!dbData) throw new Error(NO_TASKS_FOUND);

      return dbData as ITask[];
    }

    async create(newTask: ITask): Promise<ITask> {
      const dbData = await this.sequelizeTasks.create(newTask);

      if (!dbData) throw new Error(NO_TASKS_CREATED);

      return dbData as ITask;
    }

    async update(taskId: number, newTask: ITask): Promise<ITask> {
      const dbData = await this.sequelizeTasks.findOne({ where: { taskId } });

      if (!dbData) throw new Error(NO_TASKS_FOUND);

      const taskUpdated  = { updatedAt: new Date(), ...newTask };

      await this.sequelizeTasks.update(taskUpdated, { where: { taskId } });

      const response = await this.sequelizeTasks.findOne({ where: { taskId } });
      
      if (!response) throw new Error(NO_TASKS_UPDATED);

      return response as ITask;
    }

    async delete(taskId: number): Promise<string> {
      const dbData = await this.sequelizeTasks.findOne({ where: { taskId } });

      if (!dbData) throw new Error(NO_TASKS_FOUND);

      await this.sequelizeTasks.destroy({ where: { taskId } });

      return TASKS_DELETED;
    }

}