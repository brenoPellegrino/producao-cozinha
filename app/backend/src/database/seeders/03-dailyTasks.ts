/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'daily_tasks',
      [
        {
          Date: "2023-01-01",
          created_by: 1,
          created_at: "2022-12-31",
          updated_at: "2022-12-31",
        },
        {
          Date: "2023-01-02",
          created_by: 1,
          created_at: "2023-01-01",
          updated_at: "2023-01-01",
        },    
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('daily_tasks', {});
  },
};
