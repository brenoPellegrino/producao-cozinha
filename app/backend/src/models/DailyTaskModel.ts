import SequelizeTasks from "../database/models/SequelizeTasks";
import SequelizeDailyTasks from "../database/models/SequelizeDailyTasks";
import IDailyTask from "../interfaces/IDailyTask";
import SequelizeDailyTasksAssociations from "../database/models/SequelizeDailyTaskAssociations";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";
import sequelize = require("sequelize");
import SequelizeUsers from "../database/models/SequelizeUsers";
import {
  NO_TASKS_FOUND_FOR_THIS_DAY,
  RESPONSIBLE_NOT_FOUND,
  THIS_DATE_IS_ALREADY_REGISTERED,
  THIS_TASK_IS_NOT_REGISTRED_FOR_THIS_DAY,
} from "../helpers/mapStrings";
import { IDailyTaskResponse } from "../interfaces/IDailyTaskResponse";
import { date } from "joi";

export default class DailyTaskModel {
  private sequelizeDailyTasks = SequelizeDailyTasks;
  private sequelizeUsers = SequelizeUsers;
  private SequelizeDailyTasksAss = SequelizeDailyTasksAssociations;

  async findBydate(date: string): Promise<SequelizeDailyTasks[]> {
    const dateId = await this.sequelizeDailyTasks
      .findOne({
        where: { date },
      })
      .then((response) => {
        if (!response) throw new Error(NO_TASKS_FOUND_FOR_THIS_DAY);
        return response.dataValues.dailyTaskId;
      });

    const response = await SequelizeDailyTasks.findAll({
      where: { dailyTaskId: dateId },
      include: [
        {
          model: SequelizeTasks,
          as: "tasks",
          attributes: ["title", "taskId", "time"],
          through: { attributes: ["is_finished", "updated_at"], as: "status" },
          include: [
            {
              model: SequelizeUsers,
              as: "responsibles",
              attributes: ["name", "userId"],
              through: { where: { dailyTaskId: dateId }, attributes: [] },
            },
          ],
        },
      ],
      attributes: ["dailyTaskId", "date"],
    });

    return response;
  }

  async toggleFinished(
    dailyTaskId: number,
    taskId: number,
    updatedAt: string
  ): Promise<SequelizeDailyTasks> {
    const dateString = await this.sequelizeDailyTasks
      .findOne({ where: { dailyTaskId } })
      .then((response) => response?.dataValues.date);

    if (!dateString) throw new Error(NO_TASKS_FOUND_FOR_THIS_DAY);

    const dbResponse = await this.SequelizeDailyTasksAss.findOne({
      where: { dailyTaskId, taskId },
    });

    if (!dbResponse) throw new Error(THIS_TASK_IS_NOT_REGISTRED_FOR_THIS_DAY);

    await this.SequelizeDailyTasksAss.update(
      { isFinished: !dbResponse.dataValues.isFinished, updatedAt },
      { where: { dailyTaskId, taskId } }
    );

    const updated = await this.findBydate(dateString);

    const response = updated as unknown as SequelizeDailyTasks;

    return response;
  }

  async create(
    dailyTask: IDailyTask,
    dailyAssociations: IDailyTaskAssociation[][]
  ): Promise<SequelizeDailyTasks> {
    const isDateAlreadyRegistered = await this.sequelizeDailyTasks.findOne({
      where: { date: dailyTask.date },
    });

    const validUserIds = await this.sequelizeUsers
      .findAll()
      .then((response) => response.map(({ dataValues }) => dataValues.userId));

    dailyAssociations.map((taskOfTheDay) => {
      taskOfTheDay.map(({ responsibleId }) => {
        if (!validUserIds.includes(responsibleId))
          throw new Error(RESPONSIBLE_NOT_FOUND(responsibleId));
      });
    });

    if (isDateAlreadyRegistered)
      throw new Error(THIS_DATE_IS_ALREADY_REGISTERED);

    const createdDailyTask = await this.sequelizeDailyTasks.create(dailyTask);

    await Promise.all(
      dailyAssociations.map(async (taskOfTheDay) => {
        await Promise.all(
          taskOfTheDay.map(async (association) => {
            await this.SequelizeDailyTasksAss.create({
              ...association,
              dailyTaskAssociationId: 0,
              dailyTaskId: createdDailyTask.dataValues.dailyTaskId,
            });
          })
        );
      })
    );

    const created = await this.findBydate(dailyTask.date);

    const response = created as unknown as SequelizeDailyTasks;

    return response;
  }

  async update(
    dailyTaskId: number,
    tasks: IDailyTaskAssociation[][]
  ): Promise<SequelizeDailyTasks> {
    const dateString = await this.sequelizeDailyTasks
      .findOne({ where: { dailyTaskId } })
      .then((response) => response?.dataValues.date);

    if (!dateString) throw new Error(NO_TASKS_FOUND_FOR_THIS_DAY);

    const validUserIds = await this.sequelizeUsers
      .findAll()
      .then((response) => response.map(({ dataValues }) => dataValues.userId));

    tasks.map((taskOfTheDay) => {
      taskOfTheDay.map(({ responsibleId }) => {
        if (!validUserIds.includes(responsibleId))
          throw new Error(RESPONSIBLE_NOT_FOUND(responsibleId));
      });
    });
    
    const dataDb = await this.sequelizeDailyTasks.findOne({
      where: { dailyTaskId },
    });

    if (!dataDb) throw new Error(NO_TASKS_FOUND_FOR_THIS_DAY);

    await this.SequelizeDailyTasksAss.destroy({ where: { dailyTaskId } });
    
    const createdAt = dataDb.dataValues.createdAt;

    await Promise.all(
      tasks.map(async (taskOfTheDay) => {
        await Promise.all(
          taskOfTheDay.map(async (association) => {
            const updateValues = {
              ...association,
              createdAt,
              dailyTaskAssociationId: 0,
              dailyTaskId,
            };
            await this.SequelizeDailyTasksAss.create(updateValues);
          })
        );
      })
    );

    const response = await this.findBydate(dateString) as unknown as SequelizeDailyTasks;

    return response;
  }

  async delete(dailyTaskId: number): Promise<String> {
    const dbData = await this.sequelizeDailyTasks
      .findOne({ where: { dailyTaskId } });

      
    if (!dbData) throw new Error(NO_TASKS_FOUND_FOR_THIS_DAY);
      
    const dateString = dbData.dataValues.date;
    

    await this.SequelizeDailyTasksAss.destroy({ where: { dailyTaskId } });

    await this.sequelizeDailyTasks.destroy({ where: { dailyTaskId } });
    
    return `Daily task of ${dateString} deleted`;

  }
}
