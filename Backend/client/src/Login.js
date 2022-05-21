import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [data, sendData] = useState({ email: "", password: "" });
  const history = useNavigate();
  const sendDataHandler = async (e) => {
    e.preventDefault();
    if (data.email || data.password) {
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
          localStorage.setItem("token", response.data.token);
          history("/login/user", { state: data.email });
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      window.alert("All fields are compulsory");
    }
  };

  const handleChange = async (e) => {
    sendData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container mt-5" style={{ margin: "auto", width: "50%" }}>
      <h1>Login</h1>
      <div className="d-grid gap-3">
        <div className="col-auto mt-3">
          <form onSubmit={(e) => sendDataHandler(e)}>
            <div className="col-6">
              <label className="col-form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
            <Link to={"/registration"}>
              <button type="submit" className="btn btn-danger mx-4">
                Register
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
