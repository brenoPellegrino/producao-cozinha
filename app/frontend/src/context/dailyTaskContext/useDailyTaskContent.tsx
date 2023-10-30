import { useContext } from "react";
import DailyTasksContext from "./DailyTaskContext";

export const UseDailyTaskContext = () => {
  const context = useContext(DailyTasksContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};