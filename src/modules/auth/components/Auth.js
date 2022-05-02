import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Auth.module.css";
import {
  // singUp,
  deleteDemoAccount, fillDemoAccount,
  logout, login, useAuth} from "../../../services/firebase.service";

import {loadTransactions} from "../../../reducers/transactions/transactions-slice";
import {loadCategories} from "../../../reducers/categories/categories-slice";
import {loadAccounts} from "../../../reducers/accounts/accounts-slice";
import {loadBudgets} from "../../../reducers/budget/budget-slice";

function Auth() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  // const handleSignup = async () => {
  //   setLoading(true);
  //   try {
  //     await singUp(emailRef.current.value, passwordRef.current.value);
  //   } catch {
  //     alert("Email already in use!");
  //   }
  //   setLoading(false);
  // };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);

      if (emailRef.current.value === "demo@demo.com") {
        const userId = "64PX99A3tQNHepIlUmorFUXKOhl2";
        await deleteDemoAccount(userId);
        // await fillDemoAccount(userId);

        dispatch(loadTransactions(userId));
        dispatch(loadCategories(userId));
        dispatch(loadAccounts(userId));
        dispatch(loadBudgets(userId));
      }
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
