import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPass() {
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");
  const navigate = useNavigate();
 
  function sendPassChange (){
    axios
      .post( localStorage.getItem("link"), {
        password: pass,
      })
      .then(() => {
        console.log("Password Changed, login again!");
      });
  }

    return (
        <div className="p-5 d-flex justify-content-center align-items-center mt-10">
            <div className='p-5 text-white my-5 mx-auto mt-20' style={{borderRadius: '1rem', maxWidth: '400px', backgroundColor: 'black'}}>
                <div className="p-5 d-flex flex-column text-center align-items-center mx-auto w-100">
                    <Heading label={"New Password"} />
                    <SubHeading label={"Enter Email"} />
                    <InputBox 
                        onChange={(e)=>setPass(e.target.value)}
                        placeholder={"Enter password"}
                    />
                    <InputBox 
                        onChange={(e)=>setPass1(e.target.value)}
                        placeholder={"Conform Enter password"}
                    />
                    <div className="mt-4">
                        <Button onClick={()=>{
                            if (pass === pass1){
                                sendPassChange();
                                navigate("/");
                            } else {
                                alert("passwords are not same");
                            }
                        }} label={"Login Again"} />
                    </div>
                </div>
            </div>
        </div>
    )
}