import { SideCard } from "./SideCard";
import { useNavigate } from "react-router-dom";

export function Sidebar({ obj, image }) {
  // const image = useImage();
  const navigate = useNavigate();


  return (
    <div className="bg-white p-1 mt-1">
      <div className="m-2">
        <div className="d-flex">
          <img src={`http://localhost:3000/app/v1/user/Images/` + image + ".jpeg"} style={{height: "40px", width: "40px", borderRadius: "50%", marginRight: "15px"}} alt="image"/>
          <span className="brand-name fs-4 d-none d-md-block">
            {obj.firstName}
          </span>
        </div>
      </div>
      <hr className="text-dark" />
      <div className="list-group d-inline-flex justify-center">
      <a
        className="list-group-item py-2 pe-auto"
        style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <i className="bi bi-house fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Dashboard</span>
        </a>
        <a
          className="list-group-item py-2 pe-auto"
          style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <i className="bi bi-bookshelf fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Settings</span>
        </a>
        <a
          className="list-group-item py-2 pe-auto"
          style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/edit");
          }}
        >
          <i className="bi bi-pencil-square fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Edit Profile</span>
        </a>
        <a
          className="list-group-item py-2 pe-auto"
          style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/signin");
          }}
        >
          <i className="bi bi-box-arrow-in-right fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Login</span>
        </a>
        <a
          className="list-group-item py-2 pe-auto"
          style={{cursor: "pointer"}}
          onClick={() => {
            navigate("/register");
          }}
        >
          <i className="bi bi-house fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Register</span>
        </a>
        <a href="" className="list-group-item py-2">
          <i className="bi bi-emoji-smile fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Icons</span>
        </a>
        <a href="" className="list-group-item py-2">
          <i className="bi bi-wallet fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Cards</span>
        </a>
        <a href="" className="list-group-item py-2">
          <i className="bi bi-file-spreadsheet-fill fs-5 me-2"></i>
          <span className="d-none d-md-block fs-5">Tables</span>
        </a>
        <SideCard title={"Upgrade to Premium"} />
      </div>
    </div>
  );
}
