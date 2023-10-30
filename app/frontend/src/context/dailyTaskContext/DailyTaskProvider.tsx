import { ReactNode, useState } from "react";
import DailyTaskContext from "./DailyTaskContext";
import IDailyTaskCardProps from "../../interfaces/IDailyTaskProps";

export const DailyTaskProvider = ({ children }: { children: ReactNode }) => {
  const [dailyTask, setDailyTask] = useState<IDailyTaskCardProps | null>(null);

  return (
    <DailyTaskContext.Provider value={{ dailyTask, setDailyTask }}>
      {children}
    </DailyTaskContext.Provider>
  );
};