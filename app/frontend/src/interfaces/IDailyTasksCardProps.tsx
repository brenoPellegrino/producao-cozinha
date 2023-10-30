import IResponsibleCardProps from "./IResponsibleCardProps";

export default interface IDailyTasksCardProps {
  dailyTaskId: number,
  taskId: number,
  title: string,
  time: number,
  responsibles: IResponsibleCardProps[],
  status:{ is_finished: boolean }
}