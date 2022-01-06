import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllCategoriesState, setPopupItem, setPopupPrevItem} from '../../reducers/categories/categories-slice';
import {selectAllAccountsState} from '../../reducers/accounts/accounts-slice';
import { selectUserId } from '../../reducers/user/user-slice';
import SettingsBlock from './Blocks/Block';
import {usePopup} from '../../hoc/Popup/PopupContext';

function Settings() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const userId = useSelector(selectUserId);
  const {toggle} = usePopup()

  const onClickItem = async ({target}) => {
    const id = target.getAttribute('dataid');
    const title = target.getAttribute('datavalue');
    const type = target.getAttribute('datatype');
    const header = target.getAttribute('dataheader');
    console.log(`🚀 ~ file: Settings.js ~ line 35 ~ onClickItem ~ header`, header);

    dispatch(setPopupItem({id, title, userId, incomes: !!+type.toString(), header}));
    dispatch(setPopupPrevItem({id, title, userId, incomes: !!+type.toString(), header}));
    toggle()
  }

  const onClickToggle = async ({target}) => {
    const id = '';
    const title = '';
    const type = '';
    const header = target.getAttribute('dataheader');

    dispatch(setPopupItem({id, title, userId, incomes: !!+type.toString(), header}));
    dispatch(setPopupPrevItem({id, title, userId, incomes: !!+type.toString(), header}));
    toggle()
  }

  return (
    <>
      <SettingsBlock
        items={categories}
        header={"Categories"}
        onClickItem={onClickItem}
        onClickToggle={onClickToggle}
      />

      <SettingsBlock
        items={accounts}
        header={"Accounts"}
        onClickItem={onClickItem}
        onClickToggle={onClickToggle}
      />
    </>
  )
}

export default Settings;
