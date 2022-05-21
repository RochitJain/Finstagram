import axios from "axios";
import React, { useEffect, useState } from "react";
import FileList from "./FileList";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
  const [valid, setIsValid] = useState("false");
  const [loggedStatus, isLogged] = useState("false");
  const [details, setDetails] = useState({});
  const [file, setFileDetails] = useState({});
  const [allFiles, getFiles] = useState();
  const inputRef = React.useRef();
  const location = useLocation();
  const nav = useNavigate();

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("filename", details.title);
    formData.append("filedesc", details.desc);
    formData.append("email", location.state);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/upload",
        data: formData,
        headers: { token: localStorage.getItem("token") },
      });
      if (response.status === 200) {
        alert(response.data.message);
        setIsValid(false);
        setDetails({ title: "", desc: "" });
        inputRef.current.value = "";
      } else alert(response);
    } catch (err) {
      console.log(err);
    }
  };
  const result = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:3001/files/${location.state}`,
        headers: { token: localStorage.getItem("token") },
      });
      getFiles(response.data.files);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      isLogged(true);
      result();
    } else {
      alert("User not logged in");
      nav("/");
    }
  }, [inputRef]);

  const uploadDetails = (e) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadDoc = (e) => {
    setIsValid(true);
    setFileDetails(e.target.files[0]);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    nav("/");
  };
  return (
    <div className="container mt-4">
      <button
        style={{ float: "right" }}
        className="btn btn-danger"
        onClick={logoutHandler}
      >
        Logout
      </button>
      <form
        className="row mt-3"
        style={{ float: "center" }}
        onSubmit={(e) => uploadFile(e)}
      >
        <label className="form-label row g-6">File Upload</label>
        <div className="col-sm-9 ">
          <input
            ref={inputRef}
            className=" form-control"
            type="file"
            onChange={uploadDoc}
          />
        </div>
        {valid && (
          <div className="row mt-4">
            <div className="col-sm-6">
              <input
                name="title"
                className="form-control"
                placeholder="Title"
                value={details.title}
                onChange={uploadDetails}
              />
            </div>
            <div className="col-sm-6">
              <input
                name="desc"
                placeholder="Description"
                className="form-control"
                value={details.desc}
                onChange={uploadDetails}
              />
            </div>
          </div>
        )}
        <div className="mt-4 ">
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </div>
      </form>
      {allFiles && <FileList state={allFiles} />}
    </div>
  );
}

export default Dashboard;
