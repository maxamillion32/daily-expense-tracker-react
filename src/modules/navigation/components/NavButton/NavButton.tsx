import React from "react";
import {NavLink} from "react-router-dom";

type Props = {
  to: string,
  className: string,
  src: string
}

const NavButton = ({to, className, src}: Props) => (
  <NavLink
    to={to}
    className={className}
  >
    <img src={src} width="30" alt="menu button"/>
  </NavLink>
);

export default NavButton;
