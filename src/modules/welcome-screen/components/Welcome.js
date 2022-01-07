import React from "react";
import classes from "./Welcome.module.css";

function Welcome() {
  return (
    <section className={classes.Welcome}>
      <div>
        <p>Please <b>login</b> or <b>sing up</b></p>
        <p>You can try a demo account</p>
        <p>Use <b>demo@demo.com</b> as email and password for login</p>
      </div>
    </section>
  );
}

export default Welcome;
