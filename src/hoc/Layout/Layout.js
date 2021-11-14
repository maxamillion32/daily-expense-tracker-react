import React from 'react';
import {useSelector} from 'react-redux';
// import classes from './Layout.module.css';
import {selectAllCategoriesState} from '../../reducers/categories/categories-slice'
import {selectAllAccountsState} from '../../reducers/accounts/accounts-slice'
import Menu from '../../components/Navigation/Menu/Menu';

function Layout(props) {
  const allCategories = useSelector(selectAllCategoriesState);
  const allAccounts = useSelector(selectAllAccountsState);

  return (
    <div className="container">
      <main className="page-main">
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
