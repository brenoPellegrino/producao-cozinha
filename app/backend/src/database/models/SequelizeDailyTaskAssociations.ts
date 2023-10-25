/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeTasks from './SequelizeTasks';
import SequelizeDailyTasks from './SequelizeDailyTasks';

class SequelizeDailyTasksAssociations extends Model<InferAttributes<SequelizeDailyTasksAssociations>,
InferCreationAttributes<SequelizeDailyTasksAssociations>> {
  declare dailyTaskAssociationId: number;
  declare dailyTaskId: number;
  declare taskId: number;
  declare responsibleId: number;
  declare isFinished: boolean;
  declare createdAt: string;
  declare updatedAt: string;
}

SequelizeDailyTasksAssociations.init({
  dailyTaskAssociationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  
}, {
  sequelize: db,
  modelName: 'daily_tasks_associations',
  timestamps: false,
  underscored: true,
});

export default SequelizeDailyTasksAssociations;
