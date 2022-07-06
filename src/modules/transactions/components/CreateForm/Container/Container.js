import React from "react";
import classes from "../Form.module.css";

const FormContainer = ({children, onSubmit, nodeRef}) => (
  <section className={classes.form} >
    <div className={classes.formWrapper}>
      <form onSubmit={onSubmit}>
        <div className={classes.formContainer} ref={nodeRef}>
          {children}
        </div>
      </form>
    </div>
  </section>
);

export default FormContainer;
