import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading, selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";
import {selectAllTransactionsState, loadTransactions} from "../../../reducers/transactions/transactions-slice";

import Loader from "../../common/components/Loader/Loader";
import SettingsList from "./List/List";

import {usePopup} from "../../common/hoc/Popup/PopupContext";
import {getAccountStartBalance, getCurrentAccountBalance, getAccountTotalBalance} from "./utils";

function SettingsContainer() {
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

  const onClickItem = async ({currentTarget}) => {
    const id = currentTarget.getAttribute("dataid");
    const title = currentTarget.getAttribute("datavalue");
    const type = currentTarget.getAttribute("datatype");
    const header = currentTarget.getAttribute("dataheader");

    if (header === "Accounts") {
      const startBalance = getAccountStartBalance(accounts, title);
      const balance = getAccountTotalBalance(startBalance, getCurrentAccountBalance(transactions, title));

      setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
      setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
      toggle();
    } else {
      const startBalance = "";
      const balance = "";

      setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
      setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
      toggle();
    }
  };

  const onClickToggle = async ({target}) => {
    const id = "";
    const title = "";
    const type = "";
    const header = target.getAttribute("dataheader");
    const startBalance = 0;
    const balance = 0;

    setItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
    setPrevItem({id, title, userId, incomes: !!+type.toString(), header, startBalance, balance});
    toggle();
  };

  return (
    <section className={classes.Container}>
      {isLoader ? <Loader /> : null}
      {userId
        ? <>
            <SettingsList
              items={accounts}
              header={"Accounts"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
              transactions={transactions}
              itemState={item}
              prevItem={prevItem}
              setItem={setItem}
            />

            <SettingsList
              items={categories}
              header={"Categories"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
              transactions={transactions}
              itemState={item}
              prevItem={prevItem}
              setItem={setItem}
            />
          </>
        : null}
    </section>
  );
}

export default SettingsContainer;
