import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

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
        <p className={classes.active}>Transactions</p>
        <p>Budget</p>
        <p>Settings</p>
      </div>
    </nav>
  )
}

export default Menu;
