// UserContext.ts
import { createContext } from 'react';
import IDailyTaskCardProps from "../../interfaces/IDailyTaskProps";

interface DailyTaskContextType {
  dailyTask:  IDailyTaskCardProps | null;
  setDailyTask: (user: IDailyTaskCardProps | null) => void;
}

const DailyTaskContext = createContext<DailyTaskContextType | undefined>(undefined);

export default DailyTaskContext;
