import React from "react";
import {useSelector} from "react-redux";
import SettingsScreen from "./Settings/Settings";
import classes from "./Settings.module.css";
import PopupProvider from "../../../modules/common/hoc/Popup/PopupContext";
import Popup from "../../../modules/common/hoc/Popup/Popup";
import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading} from "../../../reducers/accounts/accounts-slice";
import PopupSettings from "./Popup/Settings";
import Loader from "../../../modules/common/components/Loader/Loader";


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
  );
}

export default Settings;
