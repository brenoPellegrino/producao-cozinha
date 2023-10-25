/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface, Sequelize } from 'sequelize';
import IDaylyTask from '../../interfaces/IDailyTask';
import IDailyTaskAssociation from '../../interfaces/IDailyTaskAssociation';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IDailyTaskAssociation>>('daily_tasks_associations', {
      dailyTaskAssociationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      dailyTaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'daily_tasks',
          key: 'id',
        },
        field: 'daily_task_id',
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
        field: 'task_id',
      },
      responsibleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'responsible_id',
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_finished',
      },
      createdAt: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'updated_at',
      },
      
    }, {});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('daily_tasks_associations');
  },
};