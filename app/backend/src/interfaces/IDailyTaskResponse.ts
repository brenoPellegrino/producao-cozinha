interface IUserName {
  name: string
}

interface ITasksOfTheDay{
  title: string,
  responsibles: IUserName[]
}

export interface IDailyTaskResponse {
  id: number,
  date: string,
  createdBy: number,
  createdAt: string,
  updatedAt: string,
  creator: IUserName
  tasks: ITasksOfTheDay[]
}