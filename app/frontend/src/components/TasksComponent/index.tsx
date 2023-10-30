import { useUserContext } from "../../context/userContext/useUser.tsx";
import { useEffect, useState } from "react";
import api from "../../services/api/index.tsx";
import TaskCard from "../TaskCard.tsx/index.tsx";
import ITaskCardProps from "../../interfaces/ITaskCardProps.tsx";
import ITaskComponentProps from "../../interfaces/ITaskComponentProps.tsx";
import { useNavigate } from "react-router-dom";

export default function TasksComponent({ searchTask }: ITaskComponentProps) {
  const { user } = useUserContext();
  const [tasks, setTasks] = useState([]);
  const [renderTasks, setRenderTasks] = useState([]);
  const [shallFetch, setShallFetch] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/home");

    const getTasks = async () => {
      const { data } = await api.get("/tasks", {
        headers: {
          authorization: user!.token,
        },
      });

      setTasks(data.data);
      return;
    };

    if (shallFetch) {
      getTasks();
      setShallFetch(false);
    }

    const filteredTasks = tasks.filter((task: ITaskCardProps) =>
      task.title.toLowerCase().includes(searchTask.toLowerCase())
    );

    setRenderTasks(filteredTasks);

    return;
  }, [user, searchTask]);

  return (
    <div>
      {renderTasks.map((task: ITaskCardProps) => {
        return (
          <TaskCard
            key={task.taskId}
            taskId={task.taskId}
            title={task.title}
            description={task.description}
            obs={task.obs}
            time={task.time}
          />
        );
      })}
    </div>
  );
}
