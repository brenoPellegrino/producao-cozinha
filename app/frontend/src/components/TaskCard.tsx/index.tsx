import ITaskCardProps from "../../interfaces/ITaskCardProps";

export default function taskCard(taskComponstProps: ITaskCardProps) {
  const { taskId, title, description, obs, time } = taskComponstProps;

  return (
    <div className="card" id={`${taskId}`}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
        <p>{obs}</p>
        <p>Execution time: {time}</p>
      </div>
    </div>
  );
}
