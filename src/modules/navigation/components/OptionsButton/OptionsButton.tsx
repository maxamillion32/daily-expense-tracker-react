import React, {MouseEventHandler} from "react";
import classes from "../Menu.module.css";

type Props = {
  type: string,
  onClick: MouseEventHandler<HTMLElement>,
  typeClass: string
  title: string
}

const OptionsButton = ({type, onClick, typeClass, title}:Props) => (
  <div className={`${classes.btnWrapper} ${typeClass}`}>
    <p className={classes.btnTitle}>{title}</p>
    <button
      className={`${classes.menuAddBtn} fa ${type}`}
      onClick={onClick}
    />
  </div>
);

export default OptionsButton;
