import IDailyTasksCardProps from "./IDailyTasksCardProps";

export default interface IDailyTaskCardProps {
  dailyTaskId: number,
  date: string,
  time: number,
  tasks: IDailyTasksCardProps[]

  
}