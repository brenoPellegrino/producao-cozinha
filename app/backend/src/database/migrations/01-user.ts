/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface } from 'sequelize';
import IUser from '../../interfaces/IUser';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'password',
      },
      accType: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        field: 'acc_type',
      },
      accStatus: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        field: 'acc_status',
      },
    }, {});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};