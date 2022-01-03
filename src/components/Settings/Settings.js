import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState, deleteCategory, postCategory, loadCategories, updateCategory} from '../../reducers/categories/categories-slice';
import {selectAllAccountsState, updateAccount, deleteAccount, postAccount, loadAccounts} from '../../reducers/accounts/accounts-slice';
import { selectUserId } from '../../reducers/user/user-slice';
import SettingsBlock from './Blocks/Block';
import {usePopup} from '../../hoc/Popup/PopupContext';

function Settings() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const userId = useSelector(selectUserId);
  const {toggle} = usePopup()

  const [inputCategory, setInputCategory] = useState('');
  const [inputType, setInputType] = useState(false);
  const [inputAccount, setInputAccount] = useState('');

  const onChangeType = async ({target}) => {
    const id = target.id;
    // const value = target.value;
    setInputType(target.checked);
    // const name = target.name;

    // if (name === "transactionType") {
    // setInputType(!inputType);
    // console.log(`🚀 ~ file: Settings.js ~ line 34 ~ onChangeType ~ inputType`, inputType);
    //   // dispatch(updateCategory({incomes: inputType}));
    // // }

    if (id) {
      dispatch(updateCategory({id, incomes: target.checked}));
      dispatch(loadCategories());
    }
  }

  const onChangeCategory = ({target}) => {
    const id = target.id;
    const title = target.value;
    // const name = target.name;
    const incomes = inputType;

    // if (name === "transactionType") {
    //   setInputType(!title);
    //   // title ? setInputType(false) : setInputType(!inputType);
    //   // dispatch(updateCategory({incomes: inputType}));
    // }

    if (id) {
      dispatch(updateCategory({id, title, userId, incomes}));
      dispatch(loadCategories());
    } else {
      setInputCategory(title);
    }
  }

  const onChangeAccount = ({target}) => {
    const id = target.id;
    const title = target.value;

    if (id) {
      dispatch(updateAccount({id, title, userId}));
      dispatch(loadAccounts());
    } else {
      setInputAccount(title);
    }
  }

  const onClickCreateCategoryButton = () => {
    dispatch(postCategory({title: inputCategory, userId, incomes: inputType}));
    setInputCategory('');
    setInputType(false);
    dispatch(loadCategories());
  };

  const onClickCreateAccountButton = () => {
    dispatch(postAccount({title: inputAccount, userId}));
    setInputAccount('');
    dispatch(loadAccounts());
  };

  const onClickEditCategoryButton = ({target}) => {
    // inputCategory !== '' && dispatch(updateCategory(target.id, inputCategory));
    // setInputCategory('');
    dispatch(loadCategories());
  };

  const onClickEditAccountButton = ({target}) => {
    // dispatch(updateCategory(inputCategory));
    // setInputCategory('');
    // dispatch(loadCategories());
  };

  function onClickDeleteCategoryButton({target}) {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      dispatch(deleteCategory(target.id));
      dispatch(loadCategories());
    }
  };

  function onClickDeleteAccountButton({target}) {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      dispatch(deleteAccount(target.id));
      dispatch(loadAccounts());
    }
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
        onChangeType={onChangeType}
        items={categories}
        title={"Categories"}
        placeholder={"Type the new name for the category"}
        transactionType={"true"}
      />

      <SettingsBlock
        onClickSubmitButton={onClickSubmitButton}
        onClickCreateButton={onClickCreateAccountButton}
        onClickDeleteButton={onClickDeleteAccountButton}
        onClickEditButton={onClickEditAccountButton}
        value={inputAccount}
        submitTitle={"Create"}
        onChange={onChangeAccount}
        onChangeType={onChangeType}
        items={accounts}
        title={"Accounts"}
        placeholder={"Type the new name for the account"}
        transactionType={undefined}
      />

      <button onClick={toggle}>popup</button>
    </>
  )
}

export default Settings;
