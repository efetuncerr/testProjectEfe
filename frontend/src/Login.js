import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import axios from 'axios'

function Login() {
  const [values, setValues] = useState({
    email: "",
    userPasssword: "",
  });
  
const navigate = useNavigate;

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    
    if(errors.email ==="" && errors.password ==="") { 
      axios.post ('http://localhost:8081/login', values)
      .then(res => {
        if ( res.data === "Success") {
          navigate("/home");
        }else {
          alert("Kayıtlı müşteri bulunamadı.")
        }
      })
      .catch(err => console.log(err));
    }



  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2 className="d-flex justify-content-center">Giriş yap</h2>
        <hr></hr>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              className="form-control rounded-1"
              onChange={handleInput}
            ></input>
            {errors.email && (
              <small className="text-danger ms-1 ">{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              className="form-control rounded-1"
              onChange={handleInput}
            ></input>
            {errors.password && (
              <small className="text-danger ms-1 ">{errors.password}</small>
            )}
          </div>
          <button type="submit" className="btn btn-secondary w-100 rounded-1">
            <strong>Login</strong>
          </button>
          <p className="ms-1 mt-2 d-flex justify-content-center">
            *** You are agree to our terms and policies ***
          </p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-1 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
