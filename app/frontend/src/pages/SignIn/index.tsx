import CreateUserForm from "../../components/CreateUserForm";
import RedirectButton from "../../components/RedirectButton";

function CreateAcc() {
  const token = localStorage.getItem("@token");

  if (token) {
    return window.location.href = "/home";
  }
  return (
    <div className="container">
      <RedirectButton path="/" name="Back to login" clearToken={true} />
      <div className="form-container">
        <CreateUserForm isEditAcc={false} />
      </div>
    </div>
  );
}

export default CreateAcc;
