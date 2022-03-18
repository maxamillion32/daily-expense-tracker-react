import React from "react";
import {useSelector} from "react-redux";
import classes from "./Layout.module.css";
import Menu from "../../../navigation/components/Menu";
import Auth from "../../../auth/components/Auth";
import {selectUserId} from "../../../../reducers/user/user-slice";

function Layout({children}) {
  const userId = useSelector(selectUserId);

  return (
    <div className={classes.LayoutContainer}>
      <main className={classes.LayoutMain}>
        <Auth />
        {children}
        {userId
          ? <Menu />
          : null}
      </main>
    </div>
  );
}

export default Layout;
