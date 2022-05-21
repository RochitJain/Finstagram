import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [regdata, setRegData] = useState({});
  const nav = useNavigate();
  const RegistrationForm = async (e) => {
    e.preventDefault();
    if (regdata.email || regdata.password || regdata.name) {
      try {
        const response = await axios.post(
          `http://localhost:3001/register`,
          regdata
        );
        if (response.data.status === 201) {
          alert(response.data.message);
          nav("/");
        } else {
          alert(response.data.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else window.alert("All fields are compulsory");
  };
  const handleChange = (e) => {
    setRegData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <h1>Registration</h1>
      <div className="d-grid gap-3">
        <form className="row mt-3" onSubmit={RegistrationForm}>
          <div className="row justify-content-start">
            <div className="col-sm-6">
              <label htmlFor="inputEmail4" className="form-label">
                Name
              </label>
              <input
                name="name"
                className="form-control"
                id="inputName"
                placeholder="Name"
                onChange={handleChange}
                value={regdata.name}
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="*********"
                className="form-control"
                id="inputPassword"
                onChange={handleChange}
                value={regdata.password}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                onChange={handleChange}
                value={regdata.email}
              />
            </div>

            <div className="row mt-4">
              <div className="col align-self-start">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <Link to={"/"}>
                  <button className="btn btn-info mx-4">Login</button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
