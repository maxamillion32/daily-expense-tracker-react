import React, {useState} from "react";
import {useSelector} from "react-redux";

import classes from "./Settings.module.css";

import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading, selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";

import Popup from "../../common/hoc/Popup/Popup";
import PopupSettings from "./Popup/Settings";
import Loader from "../../../modules/common/components/Loader/Loader";
import SettingsItem from "./Item/Item";

import {usePopup} from "../../common/hoc/Popup/PopupContext";

function Settings() {
  const userId = useSelector(selectUserId);
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const loadingCategories = useSelector(isCategoriesLoading);
  const loadingAccounts = useSelector(isAccountsLoading);
  const {toggle} = usePopup();

  const isLoader = (loadingCategories || loadingAccounts) && userId;

  const [item, setItem] = useState({});
  const [prevItem, setPrevItem] = useState({});

  const onClickItem = async ({target}) => {
    const id = target.getAttribute("dataid");
    const title = target.getAttribute("datavalue");
    const type = target.getAttribute("datatype");
    const header = target.getAttribute("dataheader");

    setItem({id, title, userId, incomes: !!+type.toString(), header});
    setPrevItem({id, title, userId, incomes: !!+type.toString(), header});
    toggle();
  };

  const onClickToggle = async ({target}) => {
    const id = "";
    const title = "";
    const type = "";
    const header = target.getAttribute("dataheader");

    setItem({id, title, userId, incomes: !!+type.toString(), header});
    setPrevItem({id, title, userId, incomes: !!+type.toString(), header});
    toggle();
  };

  return (
    <section className={classes.Settings}>
      {isLoader ? <Loader /> : null}
      {userId
        ? <>
            <SettingsItem
              items={categories}
              header={"Categories"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
            />

            <SettingsItem
              items={accounts}
              header={"Accounts"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
            />
          </>
        : null}

      <Popup>
        <PopupSettings itemState={item} prevItem={prevItem} setItem={setItem} />
      </Popup>
    </section>
  );
}

export default Settings;
