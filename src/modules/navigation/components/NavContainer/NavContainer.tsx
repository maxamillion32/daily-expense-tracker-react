import React, {FC} from "react";
import classes from "../Menu.module.css";

const NavContainer: FC = ({children}) => (
  <nav className={classes.menu}>
    <div className={classes.wrapper}>
      {children}
    </div>
  </nav>
);

export default NavContainer;
