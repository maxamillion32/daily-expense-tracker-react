import React from "react";
import classes from "./IconList.module.css";

function PopupIconList({onChange, icon}) {
  const options = [
    {icon: "fa-shopping-cart"},
    {icon: "fa-id-card"},
    {icon: "fa-coffee"},
    {icon: "fa-bath"},
    {icon: "fa-subway"},
    {icon: "fa-home"},
    {icon: "fa-shopping-bag"},
    {icon: "fa-briefcase"},
    {icon: "fa-hand-holding-usd"},
    {icon: "fa-cut"},
    {icon: "fa-gifts"},
    {icon: "fa-utensils"},
    {icon: "fa-asterisk"}
  ];

  return (
    <form >
      <div className={classes.IconContainer}>
        {options.map((option) => {
          const isChecked = icon === option.icon;
          return (
              <label key={option.icon} className={classes.IconWrapper}>
                <input
                  id={option.icon}
                  type="radio"
                  name="icon"
                  value={option.icon}
                  onChange={onChange}
                  checked={isChecked}
                />
                <i className={`${classes.TransactionsIcon} fas ${option.icon}`} aria-hidden="true"></i>
              </label>
          );
        })}
      </div>
    </form>
  );
}

export default PopupIconList;
