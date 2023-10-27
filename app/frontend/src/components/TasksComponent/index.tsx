
import { useUserContext } from "../../context/userContext/useUser.tsx";
import { useEffect, useState } from "react";
import api from "../../services/api/index.tsx";
import TaskCard from "../TaskCard.tsx/index.tsx";
import ITaskCardProps from "../../interfaces/ITaskCardProps.tsx";

export default function TasksComponent() {
  const [tasks, setTasks] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) return;
    const getTasks = async () => {
      const { data } = await api.get('/tasks', {
        headers: {
          authorization: user!.token
        }
      });
      console.log(data.data);
      
      setTasks(data.data);
    };

    getTasks()

    return;

    }, [user]);

  return (
    <div>
      {
        tasks.map((task: ITaskCardProps) => {
          return <TaskCard key={task.taskId} taskId={task.taskId} title={task.title} description={task.description} obs={task.obs} time={task.time} />
        })
      }
    </div>
  )
}
