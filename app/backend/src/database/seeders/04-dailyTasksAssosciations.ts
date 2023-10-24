/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'daily_tasks_associations',
      [
        {
          daily_task_id: 1,
          task_id: 1,
          responsible_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          daily_task_id: 1,
          task_id: 1,
          responsible_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          daily_task_id: 1,
          task_id: 2,
          responsible_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          daily_task_id: 2,
          task_id: 1,
          responsible_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },      
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('daily_tasks_associations', {});
  },
};
