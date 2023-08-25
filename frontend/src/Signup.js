import React from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import { useState } from "react";
import axios from 'axios'

function Signup() {


  const [values, setValues] = useState({
    name: '',
    email: '',
    userPassword: '',
  });

const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
   setValues({...values, [event.target.name]:[event.target.value]})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));

    if(errors.name==="" && errors.email ==="" && errors.userPassword ==="") { 
      axios.post ('http://localhost:8081/signup', values)
      .then(res => {
        navigate('/')
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25  ">
        <h2 className="d-flex justify-content-center">Sign Up</h2>
        <hr></hr>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              className="form-control rounded-1"
              onChange={handleInput}
            ></input>
              {errors.name && (
              <small className="text-danger ms-1 ">{errors.name}</small>
            )}
          </div>
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
              name="userPassword"
              className="form-control rounded-1"
              onChange={handleInput}
            ></input>
              {errors.userPassword && (
              <small className="text-danger ms-1 ">{errors.userPassword}</small>
            )}
          </div>
          <button type="submit" className="btn btn-secondary w-100 rounded-1">
            <strong>Sign up</strong>
          </button>
          <p>You are agree to our terms and policies</p>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-1 text-decoration-none"
          >
            Already have an account? Login here
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
