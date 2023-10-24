/* eslint-disable max-lines */

export default interface IDailyTaskAssociation {
  dailyTaskAssociationId?: number,
  dailyTaskId?: number,
  taskId: number,
  responsibleId: number,
  createdAt: string,
  updatedAt: string,
};