import { useEffect, useState } from "react";
import { UseDailyTaskContext } from "../../context/dailyTaskContext/useDailyTaskContent";
import IEmployee from "../../interfaces/IEmployee";
import ScheduleTimeCard from "../ScheduleTimeCard";

export default function ScheduleTimeComponent() {
  const { dailyTask } = UseDailyTaskContext();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const newEmployees = dailyTask?.tasks.reduce((acc, task) => {
      task.responsibles.forEach((responsible) => {
        const existingEmployee = acc.find(
          (employee) => employee.userId === responsible.userId
        );
        if (existingEmployee) {
          existingEmployee.workTime += task.time;
        } else {
          acc.push({
            userId: responsible.userId,
            name: responsible.name,
            workTime: task.time,
          });
        }
      });
      return acc;
    }, [...employees]);
    setEmployees(newEmployees ? newEmployees : []);
  }, [dailyTask]);

  return (
    <div>
      {employees.map((employee) => (
        <ScheduleTimeCard
          key={employee.userId}
          employee={employee.name}
          workTime={employee.workTime}
        />
      ))}
    </div>
  );
}
