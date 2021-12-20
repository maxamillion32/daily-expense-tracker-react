import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState, deleteCategory, postCategory, loadCategories, updateCategory} from '../../reducers/categories/categories-slice';
import {selectAllAccountsState, editAccount, deleteAccount, postAccount, loadAccounts} from '../../reducers/accounts/accounts-slice';
// import classes from './Settings.module.css';
// import SettingsItem from './Items/Item';
// import {nanoid} from 'nanoid';
import SettingsBlock from './Blocks/Block';

// const MAX_ID_LENGTH = 6;

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
      dispatch(updateCategory({id, title}));
      dispatch(loadCategories());
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
    dispatch(postCategory(inputCategory));
    setInputCategory('');
    dispatch(loadCategories());
  };

  const onClickCreateAccountButton = () => {
    dispatch(postAccount(inputAccount));
    setInputAccount('');
    dispatch(loadAccounts());
  };

  const onClickEditCategoryButton = ({target}) => {
    inputCategory !== '' && dispatch(updateCategory(target.id, inputCategory));
    // setInputCategory('');
    dispatch(loadCategories());
  };

  const onClickEditAccountButton = ({target}) => {
    // dispatch(updateCategory(inputCategory));
    // setInputCategory('');
    // dispatch(loadCategories());
  };

  function onClickDeleteCategoryButton({target}) {
    dispatch(deleteCategory(target.id));
    dispatch(loadCategories());
  };

  function onClickDeleteAccountButton({target}) {
    dispatch(deleteAccount(target.id));
    dispatch(loadAccounts());
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
        onClickEditButton={onClickEditCategoryButton}
        value={inputCategory}
        submitTitle={"Create"}
        onChange={onChangeCategory}
        items={categories}
        title={"Categories"}
        placeholder={"Type the new name for the category"}
      />

      <SettingsBlock
        onClickSubmitButton={onClickSubmitButton}
        onClickCreateButton={onClickCreateAccountButton}
        onClickDeleteButton={onClickDeleteAccountButton}
        onClickEditButton={onClickEditAccountButton}
        value={inputAccount}
        submitTitle={"Create"}
        onChange={onChangeAccount}
        items={accounts}
        title={"Accounts"}
        placeholder={"Type the new name for the account"}
      />
    </>
  )
}

export default Settings;
