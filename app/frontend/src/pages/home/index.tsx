import { useNavigate } from "react-router-dom";
import RedirectButton from "../../components/RedirectButton";
import { useUserContext } from "../../context/userContext/useUser";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import api from "../../services/api";
import DailyTasksComponent from "../../components/DailyTasksComponent";
import SearchBarComponent from "../../components/SearchBarComponent";
import { DailyTaskProvider } from "../../context/dailyTaskContext/DailyTaskProvider";
// import TasksComponent from "../../components/TasksComponent";

export default function Home() {
  const { user, setUser } = useUserContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const authorization = localStorage.getItem("@token") as string;
  if (!authorization) {
    navigate("/");
  }

  useEffect(() => {
    const recoverUserInfo = async () => {
      const authorization = localStorage.getItem("@token") as string;
      const { data } = await api.get("/users/myUser", {
        headers: {
          authorization: authorization,
        },
      });

      const { userId, accType } = data;

      setUser({ userId, accType, token: authorization });
    };

    if (!user) recoverUserInfo();
  }, [user, setUser]);

  return (
    <div>
      <Menu />
      <SearchBarComponent
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        inputType="date"
        placeholder="Search by date"
      />
      <DailyTaskProvider>
        <DailyTasksComponent fetchDate={searchTerm} />
      </DailyTaskProvider>
      <RedirectButton path="/" name="Logout" clearToken={true} />
    </div>
  );
}
