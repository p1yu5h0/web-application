import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPasswrod() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function sendUpdateRequest() {
    axios
      .post("http://localhost:3000/app/v1/user/reset-password", {
        username: email,
      })
      .then(() => {
        console.log("Email Sent");
      });
  }

  return (
    <div className="p-5 d-flex justify-content-center align-items-center mt-10">
      <div
        className="p-5 text-white my-5 mx-auto mt-20"
        style={{
          borderRadius: "1rem",
          maxWidth: "400px",
          backgroundColor: "black",
        }}
      >
        <div className="p-5 d-flex flex-column text-center align-items-center mx-auto w-100">
          <Heading label={"Forgot Password"} />
          <SubHeading label={"Enter Email"} />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter the Mail"}
          />
          <div className="mt-4">
            <Button
              onClick={() => {
                sendUpdateRequest();
                alert("Please check your mail");
                navigate("/");
              }}
              label={"Send Mail"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
