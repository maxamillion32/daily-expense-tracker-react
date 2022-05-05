import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";

import classes from "./Auth.module.css";
import {
  // singUp,
  deleteDemoAccount, fillDemoAccount,
  logout, login, useAuth
} from "../../../services/firebase/firebase-service";

import {loadTransactions} from "../../../reducers/transactions/transactions-slice";
import {loadCategories} from "../../../reducers/categories/categories-slice";
import {loadAccounts} from "../../../reducers/accounts/accounts-slice";
import {loadBudgets} from "../../../reducers/budget/budget-slice";
import {setIsDemoAccount} from "../../../reducers/user/user-slice";

import {DEMO_USER_ID, DEMO_ACCOUNT_LOGIN} from "../../../services/firebase/firebase-config";

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
    dispatch(setIsDemoAccount(false));
    try {
      await login(emailRef.current.value, passwordRef.current.value);

      if (emailRef.current.value === DEMO_ACCOUNT_LOGIN) {

        await deleteDemoAccount(DEMO_USER_ID);
        await fillDemoAccount(DEMO_USER_ID);

        dispatch(loadTransactions(DEMO_USER_ID));
        dispatch(loadCategories(DEMO_USER_ID));
        dispatch(loadAccounts(DEMO_USER_ID));
        dispatch(loadBudgets(DEMO_USER_ID));
        dispatch(setIsDemoAccount(true));
      }
    } catch (e) {
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
