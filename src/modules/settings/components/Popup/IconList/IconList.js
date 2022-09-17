import React, {memo} from "react";
import classes from "./IconList.module.css";

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
  {icon: "fa-asterisk"},
  {icon: "fa-baby-carriage"},
  {icon: "fa-basketball-ball"},
  {icon: "fa-beer"},
  {icon: "fa-cat"},
  {icon: "fa-envelope"},
  {icon: "fa-faucet"},
  {icon: "fa-film"},
  {icon: "fa-gas-pump"},
  {icon: "fa-graduation-cap"},
  {icon: "fa-hamburger"},
  {icon: "fa-hotel"},
  {icon: "fa-plane"},
  {icon: "fa-socks"},
  {icon: "fa-theater-masks"},
  {icon: "fa-tv"},
  {icon: "fa-umbrella-beach"},
  {icon: "fa-wrench"},
  {icon: "fa-taxi"},
  {icon: "fa-laptop-code"},
  {icon: "fa-pills"},
  {icon: "fa-vault"},
  {icon: "fa-face-grin-hearts"},
  {icon: "fa-comments"},
];

function PopupIconList({onChange, icon}) {
  return (
    <div className={classes.Type}>
      <p className={classes.Text}>Choose an icon for the category</p>
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
    </div>
  );
}

export default memo(PopupIconList);
