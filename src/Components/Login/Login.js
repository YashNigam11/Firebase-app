import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
 
  return (
    <div>
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <label htmlFor="Email">Email</label>
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

          <button onClick={handleSubmit}  disabled={submitButtonDisabled}>Login</button>
          <br></br>
          <b>{errorMsg}</b>
          <p>
            Create An Account ?
            <span>
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
