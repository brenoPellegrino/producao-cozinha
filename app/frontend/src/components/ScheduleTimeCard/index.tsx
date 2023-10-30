import IScheduleTimeCardProps from '../../interfaces/IScheduleTimeCardProps';

export default function ScheduleTimeCard({ employee, workTime }: IScheduleTimeCardProps) {
  return (
    <div>
      <h1>{employee}</h1>
      <h2>{workTime}</h2>
    </div>
  );
}
