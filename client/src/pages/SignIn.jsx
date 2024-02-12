import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [toggle, setToggle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Toggle = () => {
    setToggle(!toggle);
  };
  let navigate = useNavigate();


  return (
    <div className="container-fluid bg bg-light min-vh-90 flex flex-col justify-center">
      <div className="row">
        <div className={toggle ? "col-10" : "col-auto"}>
          <div className="bg-slate-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
              <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your Credentials"} />
                <InputBox
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder={"email"}
                  label={"Email"}
                />
                <InputBox
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="*********"
                  label={"Password"}
                />
                <div className="pt-4">
                  <Button
                    onClick={async () => {
                      const resp = await axios.post(
                        "http://localhost:3000/app/v1/user/signin",
                        {
                          username,
                          password,
                        }
                      );
                      localStorage.setItem("token", resp.data.token);
                      navigate("/dashboard");
                      // window.location.reload();
                    }}
                    label={"Sign up"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
