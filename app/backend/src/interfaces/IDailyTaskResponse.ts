interface IStatus {
  is_finished: boolean,
  updated_at: string
}

interface IUserName {
  name: string
}

interface ITasksOfTheDay{
  dataValues: {
    title: string,
    responsibles: IUserName[]
  }
}

export interface IDailyTaskResponse {
  dailyTaskId: number,
  date: string,
  tasks: ITasksOfTheDay[],
  status: IStatus[]
}