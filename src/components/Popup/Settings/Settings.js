import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {updateCategory, loadCategories, selectPopupItemState, setPopupItem, deleteCategory, selectPopupPrevItemState, postCategory} from '../../../reducers/categories/categories-slice';
import {selectAllTransactionsState} from '../../../reducers/transactions/transactions-slice';
import {selectUserId} from '../../../reducers/user/user-slice';
import classes from './Settings.module.css';
import {usePopup} from '../../../hoc/Popup/PopupContext';

function PopupSettings() {
  const dispatch = useDispatch();
  const popupState = useSelector(selectPopupItemState);
  // console.log(`🚀 ~ file: Settings.js ~ line 11 ~ PopupSettings ~ popupState`, popupState);
  const popupPrevState = useSelector(selectPopupPrevItemState);
  // console.log(`🚀 ~ file: Settings.js ~ line 13 ~ PopupSettings ~ popupPrevState`, popupPrevState);
  const transactions = useSelector(selectAllTransactionsState);
  const userId = useSelector(selectUserId);
  const {toggle} = usePopup()
  const {id, title, incomes} = popupState;

  const prevState = JSON.stringify(popupState) === JSON.stringify(popupPrevState);
  // console.log(`🚀 ~ file: Settings.js ~ line 19 ~ PopupSettings ~ prevState`, prevState);

  // const isExists = (data, item) => {
  //   return data.find((it) => it.title === item) ? true : false;
  // }

  const isDelete = (data, id) => {
    return transactions.find((it) => it[`${data}Id`] === id) ? true : false;
  }

  const onChangeType = async ({target}) => {
    dispatch(setPopupItem({id, title, userId, incomes: target.checked}));
  }

  const onChangeCategory = ({target}) => {
    const value = target.value;
    const type = incomes ? incomes : false;
    dispatch(setPopupItem({id, title: value, userId, incomes: type}));
  }

  const onClickEditAccountButton = ({target}) => {
    dispatch(updateCategory(popupState));
    dispatch(loadCategories());
    toggle();
  };

  function onClickDeleteButton() {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      if (isDelete('category', id)) {
        alert("This category is already in use and cannot be deleted!");
        return;
      }
      dispatch(deleteCategory(id));
      dispatch(loadCategories());
      toggle();
    }
  };

  const onClickCreateButton = () => {
    dispatch(postCategory({title, userId, incomes}));
    dispatch(loadCategories());
    toggle();
  };

  return (
    <section className={classes.Settings}>
      {Object.keys(popupPrevState).length !== 0 && <button
        className={classes.Button}
        onClick={onClickEditAccountButton}
        disabled={prevState || !title}
      >Save</button>}
      {Object.keys(popupPrevState).length === 0 && <button
        className={classes.Button}
        onClick={onClickCreateButton}
        disabled={!title}
      >Create</button>}

      <button
        className={classes.Button}
        onClick={onClickDeleteButton}
        disabled={!popupPrevState.id}
      >Delete</button>

      <div className={classes.Wrapper}>
        <input
          className={classes.Input}
          type="text"
          value={title}
          onChange={onChangeCategory}
        />
        <div className={classes.Type}>
          <input
            type="checkbox"
            checked={+incomes || false}
            onChange={onChangeType}
          />
          <label
            // htmlFor={htmlFor}
          >Incomes</label>
        </div>
      </div>
    </section>
  );
}

export default PopupSettings;
