import { useState } from "react";
import IDailyTasksCardProps from "../../interfaces/IDailyTasksCardProps";
import IResponsibleCardProps from "../../interfaces/IResponsibleCardProps";
import ResponsibleCard from "../ResponsibleCard";
import axiosApi from "../../services/api";
import { useUserContext } from "../../context/userContext/useUser";

export default function DailyTasksCard({
  dailyTaskId,
  taskId,
  title,
  responsibles,
  status,
}: IDailyTasksCardProps) {
  const { user } = useUserContext();
  const { is_finished } = status;

  const [isFinished, setIsFinished] = useState<boolean>(is_finished);

  const toggleFinishedStatus = async () => {
    const apiResponse = await axiosApi.put(
      `/daily-tasks/`,
      { dailyTaskId, taskId },
      {
        headers: {
          Authorization: user?.token || "",
        },
      }
    );

    const newStatus = apiResponse.data.data[0].tasks.find((task: IDailyTasksCardProps) => task.taskId === taskId).status.is_finished;
    
    setIsFinished(newStatus);
  };

  return (
    <>
      <td>{title}</td>
      <td>
        {responsibles.map(({ userId, name }: IResponsibleCardProps) => (
          <ResponsibleCard userId={userId} name={name} />
        ))}
      </td>
      <td>
        <input
          type="checkbox"
          id="toggleButton"
          checked={isFinished}
          onChange={toggleFinishedStatus}
        />
      </td>
    </>
  );
}
