/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          title: 'Higienização e organização das hortaliças',
          description: 'Organizar as hortaliças',
          obs: 'Esta tarefa deve ser realizada antes de qualquer outra',
          time: 75,
          created_by: 1,
        },
        {
          title: 'Limpar e aramazenar filé',
          description: 'Limpar e aramazenar filé',
          obs: 'Pesar, embalar cada tipo de produto proveniente do filé',
          time: 40,
          created_by: 1,
        }
      ],
      {},
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('tasks', {});
  },
};
