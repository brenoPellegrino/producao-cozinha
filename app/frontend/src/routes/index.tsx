import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import CreateDailyTask from "../pages/CreateDailyTask";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/createDailyTask" element={<CreateDailyTask />} />
      </Routes>
    </BrowserRouter>
  );
}
