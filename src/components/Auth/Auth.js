import { useRef, useState } from 'react';
import classes from './Auth.module.css';
import { singUp, logout, login, useAuth } from '../../services/firebase';

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
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Wrong email or password");
    }
    setLoading(false);
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <section className={classes.Main}>
      <p className={classes.Header}>Currently logged in as: <strong>{currentUser?.email}</strong></p>
      {!currentUser && <div className={classes.Fields}>
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
      </div>}

      {!currentUser && <button disabled={loading || currentUser} onClick={handleSignup}>Sing Up</button>}
      {!currentUser && <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>}
      {currentUser && <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>}

    </section>
  );
}

export default Auth;
