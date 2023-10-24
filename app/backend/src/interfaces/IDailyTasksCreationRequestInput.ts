
export default interface IDailyTasksInput {
  date: string,
  tasks: {
    taskId: number,
    responsibleIds: number[]
  }[]
}