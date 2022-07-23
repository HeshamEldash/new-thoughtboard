import React, { useState, useContext } from "react";
import AuthContext from "../ContextManagers/AuthContext";
import { Link } from "react-router-dom";

const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"


function RegisterationPage() {
  let { loginUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let Submit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let res = await fetch(`${APIENDPOINT}/register/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (res.status === 200) {
        loginUser(e);
      }
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <>
      <div className="user-form">
        <span className="form-header"> Register</span>
        <form type="submit" onSubmit={Submit}>
          <label> First Name</label>

          <input
            className="form-fields"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            name="fName"
            placeholder="Enter your first name..."
          />

          <label>Last Name</label>
          <input
            className="form-fields"
            type="text"
            name="lName"
            placeholder="Enter your last name..."
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />

          <label> Email</label>
          <input
            className="form-fields"
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label> Password</label>
          <input
            className="form-fields"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <label> Confirm Password</label>
          <input
            className="form-fields"
            type="password"
            placeholder="Renter Your Password"
            name="confPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <input className="form-button" type="submit" value="Register" />
        </form>

        <span className="form-text">
          Already have an account?
          <Link to="/login" className="form-link">
            {" "}
            Login{" "}
          </Link>
        </span>
      </div>
    </>
  );
}

export default RegisterationPage;
