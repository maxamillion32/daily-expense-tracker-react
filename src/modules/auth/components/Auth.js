import React, {useRef, useState} from "react";
import classes from "./Auth.module.css";
import {singUp, logout, login, useAuth} from "../../../services/firebase.service";
import {NavLink} from "react-router-dom";

function Auth() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignup = async () => {
    setLoading(true);
    try {
      await singUp(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Email already in use!");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Wrong email or password");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  };

  return (
    <section className={classes.Main}>
      {currentUser && <p className={classes.Header}>{currentUser?.email}</p>}
      {!currentUser && <div className={classes.Fields}>
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>}

      {/* {!currentUser && <button className={classes.Button} disabled={loading || currentUser} onClick={handleSignup}>Sing Up</button>} */}
      {!currentUser && <button className={classes.Button} disabled={loading || currentUser} onClick={handleLogin}>Log In</button>}
      {currentUser && <NavLink to={"/"} className={classes.Button} disabled={loading || !currentUser} onClick={handleLogout}>Log Out</NavLink>}

    </section>
  );
}

export default Auth;
