/* eslint-disable max-lines */

export default interface IDailyTaskAssociation {
  dailyTaskAssociationId?: number,
  dailyTaskId?: number,
  taskId: number,
  responsibleId: number,
  isFinished: boolean,
  createdAt: string,
  updatedAt: string,
};