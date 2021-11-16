import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

import classes from './Menu.module.css';
import Form from '../../Transactions/CreateForm/Form'
import {resetState} from '../../../reducers/transactions/transactions-slice';

function Menu({categories, accounts}) {
  const [onClickAddBtn, setOnClickAddBtn] = useState(false);
  const dispatch = useDispatch();
  const classesAddBtn = [
    classes.menuAddBtn,
    'fa',
    onClickAddBtn ? 'fa-times' : 'fa-plus',
    onClickAddBtn ? classes.close : ''
  ].join(' ');

  const onClickAddButton = () => {
    setOnClickAddBtn(!onClickAddBtn);

    if (onClickAddBtn) {
      dispatch(resetState());
    }
  };

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : '');

  return (
    <nav className={classes.menu}>
      <Form
        categories={categories}
        accounts={accounts}
        onClickAddBtn={onClickAddBtn}
        setOnClickAddBtn={setOnClickAddBtn}
      />
      <div className={classes.wrapper}>
        <i
          className={classesAddBtn}
          onClick={onClickAddButton}
        />
        <NavLink
            to={'/'}
            className={isActiveLink}
        >
          Transactions
        </NavLink>

        <NavLink
            to={'/budget'}
            className={isActiveLink}
        >
          Analytics
        </NavLink>

        <NavLink
            to={'/settings'}
            className={isActiveLink}
        >
          Settings
        </NavLink>
      </div>
    </nav>
  )
}

export default Menu;
