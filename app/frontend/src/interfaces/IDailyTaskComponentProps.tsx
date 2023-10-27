import IDailyTaskCardProps from "./IDailyTaskProps"

export default interface IDailyTaskComponentProps {
  dailyTaskId: number,
  date: string,
  tasks: IDailyTaskCardProps[],
}