/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Sem Responsável',
          email: 'email@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4567e3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'user'
        },
        {
          name: 'Andressa Arnal',
          email: 'andressa@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4X7pe3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'admin'
        },
        {
          name: 'Cleusa Braga',
          email: 'cleusa@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4X7pe3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'user'
        },
        {
          name: 'Daiane Carla',
          email: 'daiane@email.com',
          password: '$2a$10$0GdvO2E0tPUC0LtDyX1sZe7Of4X7pe3dpUT6dov6j3kIUFpTb/X/S',
          acc_status: 'active',
          acc_type: 'user'
        }
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
