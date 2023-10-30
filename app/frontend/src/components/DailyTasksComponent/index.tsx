import { useEffect } from "react";
import IDailyTaskCardProps from "../../interfaces/IDailyTaskProps";
import DailyTasksCard from "../DailyTasksCard";
import api from "../../services/api";
import { useUserContext } from "../../context/userContext/useUser";
import { UseDailyTaskContext } from "../../context/dailyTaskContext/useDailyTaskContent";

export default function DailyTasksComponent({
  fetchDate,
}: {
  fetchDate?: string;
}) {

  const { dailyTask, setDailyTask } = UseDailyTaskContext();

  const { user } = useUserContext();

  if (!fetchDate) {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    fetchDate = `${todayYear}-${todayMonth + 1}-${todayDate}` as string;
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const shouldRender = () => {
    return dailyTask === null;
  }

  useEffect(() => {
    const recoverTasks = async () => {
      try {
        const { data } = await api.get<{
          status: string;
          data: IDailyTaskCardProps[];
        }>(`/daily-tasks/${fetchDate}`, {
          headers: {
            authorization: user?.token || "",
          },
        });

        setDailyTask(data.data[0]);
        console.log(dailyTask, "dailyTask");
      } catch (error) {
        console.error(error);
        setDailyTask(null);
      }
    };

    recoverTasks();
    console.log(dailyTask, "dailyTask");
  }, [fetchDate]);

  return shouldRender() ? (
    <h3>Não há tarefas registradas para este dia ({`${formatDate(fetchDate!)}`})!</h3>
  ) : (
    <div id={`dailyTask=${dailyTask!.dailyTaskId}`}>
      <h2>{formatDate(fetchDate!)}</h2>
      <table>
        <thead>
          <th>Atividade</th>
          <th>Responsáveis</th>
          <th>Status</th>
        </thead>
        <tbody>
          {dailyTask!.tasks.map(({ taskId, title, responsibles, status }) => {
            return (
              <tr id={`taskId=${taskId}`}>
                <DailyTasksCard
                  dailyTaskId={dailyTask!.dailyTaskId}
                  taskId={taskId}
                  title={title}
                  responsibles={responsibles}
                  status={status}
                  time={dailyTask!.time}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
