import React from 'react';
import {useSelector} from 'react-redux';
import SettingsScreen from '../../components/Settings/Settings'
import classes from './Settings.module.css';
import PopupProvider from '../../hoc/Popup/PopupContext';
import Popup from '../../hoc/Popup/Popup';
import {selectUserId} from '../../reducers/user/user-slice';
import {isCategoriesLoading} from '../../reducers/categories/categories-slice';
import {isAccountsLoading} from '../../reducers/accounts/accounts-slice';
import PopupSettings from '../../components/Popup/Settings/Settings';
import Loader from '../../components/UI/Loader/Loader';


function Settings() {
  const userId = useSelector(selectUserId);
  const loadingCategories = useSelector(isCategoriesLoading);
  const loadingAccounts = useSelector(isAccountsLoading);
  return (
    <section className={classes.Settings}>
      {(loadingCategories || loadingAccounts) && userId && <Loader />}
      {userId && <PopupProvider>
        <SettingsScreen />
        <Popup>
          <PopupSettings />
        </Popup>
      </PopupProvider>}
    </section>
  )
}

export default Settings;
