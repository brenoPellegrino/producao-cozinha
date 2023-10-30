import { useState } from "react";
import SearchBarComponent from "../../components/SearchBarComponent";
import TasksComponent from "../../components/TasksComponent";
import UserComponent from "../../components/UserComponent";

export default function CreateDailyTask() {
  const [searchTask, setSearchTask] = useState("");
  const [searchUser, setSearchUser] = useState("");

  return (
    <div>
      <div>
        <SearchBarComponent
          placeholder="Search for a task"
          inputType="text"
          searchTerm={searchTask}
          setSearchTerm={setSearchTask}
        />
        <TasksComponent searchTask={searchTask} />
      </div>
      <div>
        <SearchBarComponent
          placeholder="Search for a user"
          inputType="text"
          searchTerm={searchUser}
          setSearchTerm={setSearchUser}
        />
        <UserComponent searchUser={searchUser} />
      </div>
    </div>
  );
}
