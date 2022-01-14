import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Layout.module.css";
import {selectAllCategoriesState, loadCategories} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState, loadAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";
import Menu from "../../../navigation/components/Menu";
import Auth from "../../../auth/components/Auth";

function Layout(props) {
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadCategories(userId));
    dispatch(loadAccounts(userId));
  }, [userId]);

  return (
    <div className={classes.LayoutContainer}>
      <main className={classes.LayoutMain}>
        <Auth />
        {props.children}
        {userId && <Menu
          categories={categories}
          accounts={accounts}
          userId={userId}
        />}
      </main>
    </div>
  );
}

export default Layout;
