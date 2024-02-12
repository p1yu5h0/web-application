import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const naviagte = useNavigate();

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    axios
      .post("http://localhost:3000/app/v1/user/upload", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Upload successful"); 
      })
      .catch((e) => {
        toast.error("Upload failed");
      });
    // naviagte("/dashboard");
    alert("added image");
  };

  const deleteProfilePic = (e) => {
    axios
      .delete("http://localhost:3000/app/v1/user/delete-image", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("Deletion successful", res); 
      })
      .catch((e) => {
        toast.error("Upload failed");
      });
    // naviagte("/dashboard");
    alert("profile pic deleted, pls refresh");
  };

  return (
    <>
    <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "10px",
        }}
      >
        <h1>Edit User Details</h1>
        <div>
          <input
            style={{
              marginBottom: "10px",
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
            }}
            type="text"
            placeholder="Change first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            style={{
              marginBottom: "10px",
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
            }}
            type="text"
            placeholder="Change last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            style={{ marginBottom: "10px" }}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{
                padding: "10px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleUpload}
            >
              Upload
            </button>
            <button
              style={{
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={deleteProfilePic}
            >
              Delete Profile Pic
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
