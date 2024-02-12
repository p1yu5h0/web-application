import React from "react";
import { useState } from "react";
import { Formex } from "../components/Navbar";
import { NameCard } from "../components/NameCard";
import { RightCards } from "../components/RightCards";
import { Row, Col } from "react-bootstrap";
import { Sidebar } from "../components/Sidebar";

export default function AccountSettings() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="container-fluid bg bg-light min-vh-90">
      <div className="row">
        <div className="flex justify-center">This is account setting page</div>
      </div>
    </div>
  );
}
