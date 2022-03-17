import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Layout.module.css";
// import {loadCategories} from "../../../../reducers/categories/categories-slice";
// import {loadAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";
import Menu from "../../../navigation/components/Menu";
import Auth from "../../../auth/components/Auth";

function Layout({children}) {
  const userId = useSelector(selectUserId);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadCategories(userId));
  //   dispatch(loadAccounts(userId));
  // }, [userId]);

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
