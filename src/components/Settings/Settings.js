import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState, editCategory, createCategory, deleteCategory} from '../../reducers/categories/categories-slice';
import {selectAllAccountsState, editAccount, createAccount, deleteAccount} from '../../reducers/accounts/accounts-slice';
// import classes from './Settings.module.css';
// import SettingsItem from './Items/Item';
import {nanoid} from 'nanoid';
import SettingsBlock from './Blocks/Block';

const MAX_ID_LENGTH = 6;

function Settings() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);

  const [inputCategory, setInputCategory] = useState('');
  const [inputAccount, setInputAccount] = useState('');

  const onChangeCategory = ({target}) => {
    const id = target.id;
    const title = target.value;

    if (id) {
      dispatch(editCategory({id, title}));
    } else {
      setInputCategory(title);
    }
  }

  const onChangeAccount = ({target}) => {
    const id = target.id;
    const title = target.value;

    if (id) {
      dispatch(editAccount({id, title}));
    } else {
      setInputAccount(title);
    }
  }

  const onClickCreateCategoryButton = () => {
    dispatch(createCategory([{id: nanoid(MAX_ID_LENGTH), title: inputCategory}]));
    setInputCategory('');
  };

  const onClickCreateAccountButton = () => {
    dispatch(createAccount([{id: nanoid(MAX_ID_LENGTH), title: inputAccount}]));
    setInputAccount('');
  };

  function onClickDeleteCategoryButton({target}) {
    dispatch(deleteCategory(target.id));
  };

  function onClickDeleteAccountButton({target}) {
    dispatch(deleteAccount(target.id));
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <SettingsBlock
        onClickSubmitButton={onClickSubmitButton}
        onClickCreateButton={onClickCreateCategoryButton}
        onClickDeleteButton={onClickDeleteCategoryButton}
        value={inputCategory}
        submitTitle={"Create"}
        onChange={onChangeCategory}
        items={categories}
        title={"Categories"}
      />

      <SettingsBlock
        onClickSubmitButton={onClickSubmitButton}
        onClickCreateButton={onClickCreateAccountButton}
        onClickDeleteButton={onClickDeleteAccountButton}
        value={inputAccount}
        submitTitle={"Create"}
        onChange={onChangeAccount}
        items={accounts}
        title={"Accounts"}
      />
    </>
  )
}

export default Settings;
