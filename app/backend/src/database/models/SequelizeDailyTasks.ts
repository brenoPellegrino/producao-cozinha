/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeTasks from './SequelizeTasks';

class SequelizeDailyTasks extends Model<InferAttributes<SequelizeDailyTasks>,
InferCreationAttributes<SequelizeDailyTasks>> {
  declare dailyTaskId: number;
  declare date: string;
  declare createdBy: number;
  declare createdAt: string;
  declare updatedAt: string;
}

SequelizeDailyTasks.init({
  dailyTaskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },

  date: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'date',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'created_by',
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
  
}, {
  sequelize: db,
  modelName: 'daily_tasks',
  timestamps: false,
  underscored: true,
});

SequelizeDailyTasks.belongsTo(SequelizeUsers, {
  foreignKey: 'created_by',
  as: 'creator',
});

SequelizeDailyTasks.belongsToMany(SequelizeTasks, {
  through: 'daily_tasks_associations', // Mesma tabela de associação
  foreignKey: 'dailyTaskId', // Chave estrangeira que se refere a SequelizeDailyTasks
  otherKey: 'taskId', // Chave estrangeira que se refere a SequelizeTasks
  as: 'tasks', // Alias para o relacionamento
});


export default SequelizeDailyTasks;
