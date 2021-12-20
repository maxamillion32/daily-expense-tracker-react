import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import classes from './Layout.module.css';
import {selectAllCategoriesState, loadCategories} from '../../reducers/categories/categories-slice'
import {selectAllAccountsState, loadAccounts} from '../../reducers/accounts/accounts-slice'
import Menu from '../../components/Navigation/Menu/Menu';

function Layout(props) {
  const allCategories = useSelector(selectAllCategoriesState);
  const allAccounts = useSelector(selectAllAccountsState);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadAccounts());
  }, [dispatch]);

  return (
    <div className={classes.LayoutContainer}>
      <main className={classes.LayoutMain}>
        {props.children}
        <Menu
          categories={allCategories}
          accounts={allAccounts}
        />
      </main>
    </div>
  )
}

export default Layout;
