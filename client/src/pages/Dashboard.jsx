import React, { useEffect } from "react";
import { useState } from "react";
import { NameCard } from "../components/NameCard";
import { RightCards } from "../components/RightCards";
import { Row, Col } from "react-bootstrap";
import { useObj } from '../components/Layout';
import axios from "axios";


export default function Dashboard({}) {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const obj = useObj();
  const [image, setImage] = useState("");

  useEffect(()=>{
    axios
      .get("http://localhost:3000/app/v1/user/getImage", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setImage(res.data.image), console.log(res.data.image);
      })
      .catch((e) => console.log(e));
  })

  return (
    <div className="container-fluid bg bg-light min-vh-90 flex justify-center">
      <div className="row">
        {
          <div className={toggle? "col-12": "col-auto"}>
            <Row>
              <Col sm={6}>
                <NameCard name={obj.username} image={image} />
                <NameCard name={obj.firstName} image={image}/>
              </Col>
              <Col sm={6}>
                <RightCards name={obj.lastName} />
              </Col>
            </Row>
          </div>
        }
      </div>
    </div>
  );
}
