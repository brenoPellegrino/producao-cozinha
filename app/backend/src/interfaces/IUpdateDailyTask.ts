export default interface IUpdateDailyTask {
  dailyTaskId: number,
  tasks: {
    taskId: number,
    responsibleIds: number[]
  }[]
};