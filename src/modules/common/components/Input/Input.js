import React from "react";
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

function Input ({name, type, placeholder, onChange, label, errorMessage, value, valid, touched, shouldValidate}) {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  inputType === "checkbox" ? cls.push(classes.InputTypeCheckbox) : cls.push(classes.InputType);

  if (isInvalid({valid, touched, shouldValidate})) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>

      {
        isInvalid({valid, touched, shouldValidate})
        ? <span>{errorMessage || "Enter correct value"}</span>
        : null
      }
    </div>
  );
}

export default Input;
