import axios from "axios";
import React, { useEffect, useState } from "react";
import FileList from "./FileList";
import { useLocation } from "react-router-dom";

function Documents() {
  const [isValid, setIsValid] = useState("false");
  const [details, setDetails] = useState({});
  const [file, setFileDetails] = useState({});
  const [allFiles, getFiles] = useState();
  const inputRef = React.useRef();
  const location = useLocation();

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("filename", details.title);
    formData.append("filedesc", details.desc);
    formData.append("email", location.state);
    console.log(file);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/upload",
        data: formData,
        headers: { token: localStorage.getItem("token") },
      });
      console.log(response);
      if (response.status == 200) {
        alert(response.data.message);
        setIsValid(false);
        setDetails({ title: "", desc: "" });
        inputRef.current.value = "";
        //window.location.reload();
        // result();
      } else alert(response);
    } catch (err) {
      console.log(err);
    }
  };
  const result = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3001/files",
        headers: { token: localStorage.getItem("token") },
      });
      console.log(response.data.files);
      getFiles(response.data.files);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    result();
  }, [inputRef]);

  const uploadDetails = (e) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadDoc = (e) => {
    setIsValid(true);
    console.log("fileData", e.target.files[0]);
    setFileDetails(e.target.files[0]);
  };
  return (
    <div className="container mt-4">
      <form className="row mt-3" onSubmit={(e) => uploadFile(e)}>
        <label className="form-label row g-6">File Upload</label>
        <div className="col-sm-9 ">
          <input
            ref={inputRef}
            className=" form-control"
            type="file"
            onChange={uploadDoc}
          />
        </div>
        {isValid === true && (
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

export default Documents;
