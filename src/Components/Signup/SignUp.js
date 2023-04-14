import React, { useState } from "react";
import "./SignUp.css";
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass, values.name)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
 
  return (
    <div>
      <div className="signup-box">
        <h1>Sign-Up</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(event) => {
              setValues((prev) => ({ ...prev, name: event.target.value }));
            }}
          />
          <label htmlFor="username">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(event) => {
              setValues((prev) => ({ ...prev, email: event.target.value }));
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(event) => {
              setValues((prev) => ({ ...prev, pass: event.target.value }));
            }}
          />

          <button onClick={handleSubmit}  disabled={submitButtonDisabled}>Sign-Up</button>
          <br></br>
          <b>{errorMsg}</b>
          <p>
            Already have an Account?
            <span>
              <Link to="/Login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
