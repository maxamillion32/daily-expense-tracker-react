import React, {memo} from "react";
import classes from "./Input.module.css";
import {isInvalid} from "../../../transactions/components/CreateForm/utils/utils";

interface InputProps {
  name: string,
  type: string,
  placeholder: string,
  onChange: () => void,
  label: string,
  errorMessage: string,
  value: string,
  valid: boolean,
  touched: boolean,
  shouldValidate: boolean,
  checked: boolean,
  isDisabled: boolean
}

function Input (
  {
    name, type, placeholder, onChange,
    label, errorMessage, value, valid,
    touched, shouldValidate, checked,
    isDisabled
  }: InputProps) {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  inputType === "checkbox" ? cls.push(classes.InputTypeCheckbox) : cls.push(classes.InputType);

  // if (isInvalid({valid, touched, shouldValidate})) {
  //   cls.push(classes.invalid);
  // }

  return (
    <div className={cls.join(" ")}>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        id={htmlFor}
        value={value}
        checked={checked}
        onChange={onChange}
        autoFocus={name === "sum"}
        autoComplete="off"
        disabled={isDisabled}
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

export default memo(Input);
