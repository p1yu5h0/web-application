import React, { useState } from "react";
import { Button } from "../components/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


export default function GlobalSignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const notify = () => toast("Wow so easy !");


  const handleSignIn = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:3000/app/v1/user/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", resp.data.token);
      navigate("/dashboard");

    } catch (e) {
      // alert("Invalid username or password.");
      toast(e, "Invalid username or password.")
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center mt-10">
      <ToastContainer />
      <div
        className="p-5 text-white my-5 mx-auto mt-20"
        style={{
          borderRadius: "1rem",
          maxWidth: "400px",
          backgroundColor: "black",
        }}
      >
        <div className="p-5 d-flex flex-column text-center align-items-center mx-auto w-100">
          <Heading label={"Dashboard"} />
          <SubHeading label={"Sign In"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="piyush@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            type={"password"}
          />
          <div className="pt-4">
            <Button onClick={handleSignIn} label={"Sign in"} />
          </div>
          <a
            className="mt-2"
            onClick={() => {
              navigate("/forgotpassword");
            }}
            style={{ cursor: "pointer", color: "lightblue" }}
          >
            Forget Password
          </a>
        </div>
      </div>
    </div>
  );
}
