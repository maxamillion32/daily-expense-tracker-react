import React from 'react';
import {useState} from 'react';

import classes from './Menu.module.css';
import Form from '../../Transactions/CreateForm/Form'

function Menu({categories, accounts}) {
  const [onClickAddBtn, setOnClickAddBtn] = useState(false);
  const classesAddBtn = [
    classes.menuAddBtn,
    'fa',
    onClickAddBtn ? 'fa-times' : 'fa-plus',
    onClickAddBtn ? classes.close : ''
  ].join(' ');

  const onClickAddButton = () => {
    setOnClickAddBtn(!onClickAddBtn);
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
