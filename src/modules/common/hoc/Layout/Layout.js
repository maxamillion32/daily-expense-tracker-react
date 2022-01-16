import React from "react";
import {useSelector} from "react-redux";
import classes from "./Layout.module.css";
import {selectUserId} from "../../../../reducers/user/user-slice";
import Menu from "../../../navigation/components/Menu";
import Auth from "../../../auth/components/Auth";

function Layout(props) {
  const userId = useSelector(selectUserId);

  return (
    <div className={classes.LayoutContainer}>
      <main className={classes.LayoutMain}>
        <Auth />
        {props.children}
        {userId
          ? <Menu />
          : null}
      </main>
    </div>
  );
}

export default Layout;
