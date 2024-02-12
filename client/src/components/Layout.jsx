import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useContext, useEffect, useState } from "react";
import { Suspense } from "react";
import { Formex } from "./Navbar";
import Footer from "../components/Footer";
import { Sidebar } from "./Sidebar";
import axios from "axios";

const ObjContext = createContext();
const ImageContext = createContext();

export default function Layout({ children }) {
  const [toggle, setToggle] = useState(window.innerWidth > 566);
  const isGlobalSignUp = window.location.pathname === "/";

  const Toggle = () => {
    setToggle(!toggle);
  };

  const [obj, setObj] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/app/v1/user/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setObj(resp.data.userdetails);
      });
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
  }, [children]);

  return (
    <ObjContext.Provider value={obj}>
      <ImageContext.Provider value={image}>
        <div className="container-fluid bg bg-light min-vh-100 min-vw-100">
          <div className="row mt-1">
            {!isGlobalSignUp && toggle && (
              <div className="col-2 bg-white col-md-2 vh-60 position-sticky ">
                <Sidebar obj={obj} image={image} />
              </div>
            )}
            <div
              className={
                toggle ? "col-10 col-sm hidden-md hidden-lg" : "col-auto"
              }
            >
              {!isGlobalSignUp && <Formex Toggle={Toggle} />}
              <main>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </main>
            </div>
            {!isGlobalSignUp && <Footer />}
          </div>
        </div>
      </ImageContext.Provider>
    </ObjContext.Provider>
  );
}

export function useObj() {
  return useContext(ObjContext);
}

export function useImage() {
  return useContext(ImageContext);
}
