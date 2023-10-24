/* eslint-disable max-lines */
import {
  DataTypes, InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class SequelizeUsers extends Model<InferAttributes<SequelizeUsers>,
InferCreationAttributes<SequelizeUsers>> {
  declare userId: number;
  declare name: string;
  declare email: string;
  declare password?: string;
  declare accType: "admin" | "user";
  declare accStatus: "active" | "inactive";
}

SequelizeUsers.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
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
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeUsers;
