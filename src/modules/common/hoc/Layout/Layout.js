import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Layout.module.css";
import {selectAllCategoriesState, loadCategories} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState, loadAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";
import Menu from "../../../navigation/components/Menu";
import Auth from "../../../auth/components/Auth";

function Layout(props) {
  const allCategories = useSelector(selectAllCategoriesState);
  const allAccounts = useSelector(selectAllAccountsState);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadAccounts());
  }, [dispatch]);

  return (
    <div className={classes.LayoutContainer}>
      <main className={classes.LayoutMain}>
        <Auth />
        {props.children}
        {userId && <Menu
          categories={allCategories}
          accounts={allAccounts}
          userId={userId}
        />}
      </main>
    </div>
  );
}

export default Layout;
