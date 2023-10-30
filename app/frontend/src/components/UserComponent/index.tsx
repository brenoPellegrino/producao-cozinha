import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/userContext/useUser";
import axiosApi from "../../services/api";
import IUserDB from "../../interfaces/IUserDB";
import UserCard from "../UserCard";

export default function UserComponent({ searchUser }: { searchUser: string  }) {
  const { user } = useUserContext();
  const [employees, setEmployees] = useState<IUserDB[]>([]);
  const [renderEmployees, setRenderEmployees] = useState<IUserDB[]>([]);
  const [shallFetch, setShallFetch] = useState<boolean>(true);

  useEffect(() => {
    if(shallFetch) {
      const recoverUserData = async () => {
        const { data } = await axiosApi.get("/users", {
          headers: {
            authorization: user!.token,
          },
        });
        console.log(data, "data");
        setEmployees(data.data);
      };
      recoverUserData();
      setShallFetch(false);
    }

    const filteredEmployees = employees.filter((employee: IUserDB) =>
      employee.name.toLowerCase().includes(searchUser.toLowerCase())
    );

    setRenderEmployees(filteredEmployees);

  }, [user, searchUser]);

  return (
    <div>
      {renderEmployees.map((employee: IUserDB) => {
        if (employee.userId !== 1) {
          return <UserCard employee={employee.name} userId={employee.userId} />;
        }
      })}
    </div>
  );
}
