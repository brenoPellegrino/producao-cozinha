import IResponsibleCardProps from "./IResponsibleCardProps";

export default interface IDailyTasksCardProps {
  dailyTaskId: number,
  taskId: number,
  title: string,
  responsibles: IResponsibleCardProps[],
  status:{ is_finished: boolean }
}