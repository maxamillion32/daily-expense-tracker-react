import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import classes from './Menu.module.css';
import Form from '../../Transactions/CreateForm/Form'
import {resetState, isButtonShow} from '../../../reducers/transactions/transactions-slice';

function Menu({categories, accounts}) {
  const [onClickAddBtn, setOnClickAddBtn] = useState(false);
  const dispatch = useDispatch();
  const showButton = useSelector(isButtonShow);

  const classesAddBtn = [
    classes.menuAddBtn,
    'fa',
    onClickAddBtn ? 'fa-times' : 'fa-plus',
  ].join(' ');

  const onClickAddButton = () => {
    setOnClickAddBtn(!onClickAddBtn);

    if (onClickAddBtn) {
      dispatch(resetState());
    }
  };

  const isActiveLink = ({isActive}) => (isActive ? `${classes.active}` : '');
  const nodeRef = React.useRef(null);

  return (
    <>
      <Form
        categories={categories}
        accounts={accounts}
        onClickAddBtn={onClickAddBtn}
        setOnClickAddBtn={setOnClickAddBtn}
      />

      <nav className={classes.menu}>
        <div className={classes.wrapper}>
          {showButton && <CSSTransition
              in={onClickAddBtn}
              timeout={300}
              classNames={{
                enterActive: `${classes.addBtnEnterActive}`,
                enterDone: `${classes.addBtnEnterDone}`,
              }}
              nodeRef={nodeRef}
            >
            <i
              className={classesAddBtn}
              onClick={onClickAddButton}
              ref={nodeRef}
            />
          </CSSTransition>}

          <NavLink
              to={'/'}
              className={isActiveLink}
          >
            Transactions
          </NavLink>

          <NavLink
              to={'/statistics'}
              className={isActiveLink}
          >
            Statistics
          </NavLink>

          <NavLink
              to={'/settings'}
              className={isActiveLink}
          >
            Settings
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Menu;
