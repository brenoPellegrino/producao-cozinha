import { useEffect, useState } from "react";
import IDailyTaskCardProps from "../../interfaces/IDailyTaskProps";
import DailyTasksCard from "../DailyTasksCard";
import api from "../../services/api";
import { useUserContext } from "../../context/userContext/useUser";

export default function DailyTasksComponent({
  fetchDate,
}: {
  fetchDate?: string;
}) {
  const INITIAL_STATE = {
    dailyTaskId: 0,
    date: "",
    tasks: [
      {
        dailyTaskId: 0,
        taskId: 0,
        title: "",
        responsibles: [],
        status: { is_finished: false },
      },
    ],
  };

  const [tasksOfTheDay, setTasksOfTheDay] =
    useState<IDailyTaskCardProps>(INITIAL_STATE);
  const { user } = useUserContext();
  const { dailyTaskId, tasks } = tasksOfTheDay;

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

        console.log(data.data[0]);
        setTasksOfTheDay(data.data[0]);
      } catch (error) {
        console.error(error);
        setTasksOfTheDay({ ...INITIAL_STATE, date: fetchDate! });
      }
    };

    recoverTasks();
  }, [fetchDate]);

  return tasksOfTheDay.dailyTaskId === 0 ? (
    <h3>Não há tarefas registradas nesta data</h3>
  ) : (
    <div id={`dailyTask=${dailyTaskId}`}>
      <h2>{formatDate(fetchDate!)}</h2>
      <table>
        <thead>
          <th>Atividade</th>
          <th>Responsáveis</th>
          <th>Status</th>
        </thead>
        <tbody>
          {tasks.map(({ taskId, title, responsibles, status }) => {
            return (
              <tr id={`taskId=${taskId}`}>
                <DailyTasksCard
                  dailyTaskId={dailyTaskId}
                  taskId={taskId}
                  title={title}
                  responsibles={responsibles}
                  status={status}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
