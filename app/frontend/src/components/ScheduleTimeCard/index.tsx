import IScheduleTimeCardProps from '../../interfaces/IScheduleTimeCardProps';

export default function ScheduleTimeCard({ Name, workTime }: IScheduleTimeCardProps) {
  return (
    <div>
      <h1>{Name}</h1>
      <h2>{workTime}</h2>
    </div>
  );
}
