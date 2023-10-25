/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import db from '.';
import SequelizeUsers from './SequelizeUsers';
import SequelizeDailyTasks from './SequelizeDailyTasks';

class SequelizeTasks extends Model<InferAttributes<SequelizeTasks>,
InferCreationAttributes<SequelizeTasks>> {
  declare taskId: number;
  declare title: string;
  declare description: string;
  declare obs: string;
  declare time: number;
  declare createdBy: number;
}

SequelizeTasks.init({
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'title',
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'description',
  },
  obs: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'obs',
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'time',
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
}, {
  sequelize: db,
  modelName: 'tasks',
  timestamps: false,
  underscored: true,
});

SequelizeTasks.belongsTo(SequelizeUsers, {
  foreignKey: 'createdBy',
  as: 'creator',
});

SequelizeTasks.belongsToMany(SequelizeUsers, {
  through: 'daily_tasks_associations', // Mesma tabela de associação
  foreignKey: 'taskId', // Chave estrangeira que se refere a SequelizeDailyTasks
  otherKey: 'responsibleId', // Chave estrangeira que se refere a SequelizeTasks
  as: 'responsibles', // Alias para o relacionamento
});

export default SequelizeTasks;
