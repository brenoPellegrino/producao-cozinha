/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITasks from '../../interfaces/ITask';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITasks>>('tasks', {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    }, {});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('tasks');
  },
};