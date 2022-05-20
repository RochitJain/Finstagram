import React, { useState } from "react";
import axios from "axios";
import FileList from "./FileList";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [data, sendData] = useState({ email: "", password: "" });
  const history = useNavigate();
  const sendDataHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/login",
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        data,
      });
      if (response.data.auth) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        history("/login/user", { state: data.email });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleChange = async (e) => {
    sendData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container">
      <div className="row g-6 align-items-center">
        <div className="col-auto">
          <form onSubmit={(e) => sendDataHandler(e)}>
            <div className="col-10">
              <label className="col-form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
