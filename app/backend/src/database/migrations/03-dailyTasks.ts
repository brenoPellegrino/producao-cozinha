/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { DataTypes, Model, QueryInterface, Sequelize } from "sequelize";
import IDaylyTask from "../../interfaces/IDailyTask";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IDaylyTask>>(
      "daily_tasks",
      {
        dailyTaskId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: "id",
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "date",
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
          field: "created_by",
        },
        createdAt: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "updated_at",
        },
      },
      {}
    );
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("daily_tasks");
  },
};
