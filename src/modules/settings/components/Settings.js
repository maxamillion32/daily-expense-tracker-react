import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Settings.module.css";

import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading, selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";
import {selectAllTransactionsState, loadTransactions} from "../../../reducers/transactions/transactions-slice";

import Popup from "../../common/hoc/Popup/Popup";
import PopupSettings from "./Popup/Popup";
import Loader from "../../../modules/common/components/Loader/Loader";
import SettingsItem from "./Item/Item";

import {usePopup} from "../../common/hoc/Popup/PopupContext";

const getAccountStartBalance = (accounts, title) => {
  const currentAccount = accounts
  .find((account) => account.title === title);

  return currentAccount.startBalance;
};

function Settings() {
  const userId = useSelector(selectUserId);
  const transactions = useSelector(selectAllTransactionsState);
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const loadingCategories = useSelector(isCategoriesLoading);
  const loadingAccounts = useSelector(isAccountsLoading);
  const {toggle} = usePopup();
  const dispatch = useDispatch();

  const isLoader = (loadingCategories || loadingAccounts) && userId;

  useEffect(() => {
    dispatch(loadTransactions());
    // eslint-disable-next-line
  }, []);

  const [item, setItem] = useState({});
  const [prevItem, setPrevItem] = useState({});

  const onClickItem = async ({target}) => {
    const id = target.getAttribute("dataid");
    const title = target.getAttribute("datavalue");
    const type = target.getAttribute("datatype");
    const header = target.getAttribute("dataheader");

    if (header === "Accounts") {
      const startBalance = getAccountStartBalance(accounts, title);

      setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
      setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
      toggle();
    } else {
      const startBalance = "";

      setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
      setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
      toggle();
    }
  };

  const onClickToggle = async ({target}) => {
    const id = "";
    const title = "";
    const type = "";
    const header = target.getAttribute("dataheader");
    const startBalance = 0;

    setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
    setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance});
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
        <PopupSettings
          itemState={item}
          prevItem={prevItem}
          setItem={setItem}
          transactions={transactions}
          accounts={accounts}
        />
      </Popup>
    </section>
  );
}

export default Settings;
