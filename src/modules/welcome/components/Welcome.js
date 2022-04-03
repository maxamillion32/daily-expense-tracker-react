import React from "react";
import classes from "./Welcome.module.css";

function Welcome() {
  return (
    <section className={classes.Welcome}>
      <div>
        <p>Please <b>login</b> or <b>sing up</b><sup>*</sup></p>
        <p>You can try a demo account</p>
        <p>Use <b>demo@demo.com</b> as email and password for login</p>
        <br />
        <p style={{fontSize: 12}}><sup>*</sup><i>sing up is not available at the moment because the app is in development</i></p>
      </div>
    </section>
  );
}

export default Welcome;
