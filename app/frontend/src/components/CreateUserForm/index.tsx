import { useState } from "react";
import IUserRegisterForm from "../../interfaces/IUserRegisterForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm({
  isEditAcc = false,
}: {
  isEditAcc: boolean;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const navigate = useNavigate();

  const token = isEditAcc ? localStorage.getItem("@token") : null;

  console.log(token);

  function clearState(): void {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    return;
  }
  
  async function editUser(data: IUserRegisterForm): Promise<void> {
    const apiResponse = await api
      .patch(`/users`, data, {
        headers: {
          Authentication: `${token}`,
        },
      })
      .then((response) => response)
      .catch((error) => error.response);

    if (apiResponse.status !== 200) {
      throw new Error(apiResponse.data.message);
    }

    alert("User edited successfully");

    clearState();

    return;
  }

  async function registerNewUser(data: IUserRegisterForm): Promise<void> {
    const apiResponse = await api
      .post("/users", data)
      .then((response) => response)
      .catch((error) => error.response);

    if (apiResponse.status !== 201) {
      throw new Error(apiResponse.data.message);
    }
    localStorage.setItem("@token", apiResponse.data.token);

    alert("User created successfully");

    clearState();

    return;
  }

  async function handlerSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    try {
      isEditAcc ? await editUser(data) : await registerNewUser(data);

      return navigate("/home");
    } catch (error) {
      alert((error as Error).message);
      return;
    }
  }

  return (
    <div className="create-acc-form-container">
      <h1>Insert values</h1>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          {isEditAcc ? "New Password:" : "Password:"}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Password confirmation:
          <input
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => clearState()}>Clear</button>
    </div>
  );
}