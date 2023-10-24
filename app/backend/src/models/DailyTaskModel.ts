import SequelizeTasks from "../database/models/SequelizeTasks";
import SequelizeDailyTasks from "../database/models/SequelizeDailyTasks";
import IDailyTask from "../interfaces/IDailyTask";
import SequelizeDailyTasksAssociations from "../database/models/SequelizeDailyTaskAssociations";
import { Sequelize } from "sequelize";
import IDailyTaskAssociation from "../interfaces/IDailyTaskAssociation";
import sequelize = require("sequelize");

export default class DailyTaskModel {
    private sequelizeDailyTasks = SequelizeDailyTasks;
    private sequelizeTasks = SequelizeTasks;
    private SequelizeDailyTasksAss = SequelizeDailyTasksAssociations;

    async findAll(): Promise<SequelizeDailyTasks[]> {

      const dbDailyTasks = await this.sequelizeDailyTasks.findAll({
        include: [
          {
            association: 'creator',
            attributes: ['name']
          },
          {
            association: 'tasks',
            attributes: ['title'],
            through: {
              attributes: ['daily_task_id'],
              where: { dailyTaskId: sequelize.col('daily_task_associations.daily_task_id') },
            },
            include: [
              {
                association: 'responsibles',
                attributes: ['name', 'id'],
                through: { attributes: [] },
                order: [['daily_task_associations', 'createdAt', 'DESC']],
              },
            ],
          },
        ],
        attributes: { exclude: ['created_by'] }
      });

      console.log("to aki");
      if (!dbDailyTasks) throw new Error("No tasks found");

      return dbDailyTasks;
    }

    async findAllByDay(searchDate?: string ): Promise<SequelizeDailyTasks[]> {
      if (!searchDate) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formattedDate = `${year}-${month}-${day}`;
        searchDate = formattedDate;
      }
      
      const dbDailyTasks = await this.sequelizeDailyTasks.findAll({
        include: [
          {
            association: 'creator',
            attributes: ['name']
          },
          {
            association: 'tasks',
            attributes: ['title'],
            include: [
              {
                association: 'responsibles',
                attributes: ['name'],
                through: { attributes: [] }
              }
            ],
            through: { attributes: [] }
          },
        ],
        attributes: { exclude: ['created_by'] },
        where: { date: searchDate }
      });
      if (!dbDailyTasks) throw new Error("No tasks found");

      return dbDailyTasks;
    }

  async findById(id: number): Promise<SequelizeDailyTasks> {
    const dbDailyTask = await this.sequelizeDailyTasks.findByPk(id, {
      include: [
        {
          association: 'creator',
          attributes: ['name']
        },
        {
          association: 'tasks',
          attributes: ['title'],
          include: [
            {
              association: 'responsibles',
              attributes: ['name'],
              through: { attributes: [] }
            }
          ],
          through: { attributes: [] }
        },
      ],
      attributes: { exclude: ['created_by'] }
    });
    if (!dbDailyTask) throw new Error("No task found");

    return dbDailyTask;
  }

  async create(dailyTask: IDailyTask, dailyAssociations: IDailyTaskAssociation[][]): Promise<SequelizeDailyTasks> {
    const createdDailyTask = await this.sequelizeDailyTasks.create(dailyTask);
    const newDailyTaskId = createdDailyTask.dataValues.dailyTaskId;

    await Promise.all(dailyAssociations.map(async (taskOfTheDay) => {
      await Promise.all(taskOfTheDay.map(async (association) => {
        await this.SequelizeDailyTasksAss.create(
          { 
            ...association,
            dailyTaskAssociationId: 0,
            dailyTaskId: createdDailyTask.dataValues.dailyTaskId
          });
      }));
    }));

    
    const created = await this.findById(newDailyTaskId);

    return created;
  }
}