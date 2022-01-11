import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading, selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";
import {selectAllTransactionsState, loadTransactions} from "../../../reducers/transactions/transactions-slice";

import Popup from "../../common/hoc/Popup/Popup";
import SettingsPopup from "./Popup/Popup";
import Loader from "../../common/components/Loader/Loader";
import SettingsContainerItem from "./Item/Item";

import {usePopup} from "../../common/hoc/Popup/PopupContext";

const getAccountStartBalance = (accounts, title) => {
  const currentAccount = accounts
  .find((account) => account.title === title);

  return currentAccount.startBalance;
};

const getAccountTotalBalance = (startBalance, balance) => {
  return (balance + +startBalance).toFixed(2);
};

const getCurrentAccountBalance = (transactions, title) => {
  const incomes = transactions
  .filter((transaction) => transaction.expense === false)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  const expenses = transactions
  .filter((transaction) => transaction.expense === true)
  .filter((transaction) => transaction.account.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);

  return incomes - expenses;
};

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

  const onClickItem = async ({target}) => {
    const id = target.getAttribute("dataid");
    const title = target.getAttribute("datavalue");
    const type = target.getAttribute("datatype");
    const header = target.getAttribute("dataheader");

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
            <SettingsContainerItem
              items={categories}
              header={"Categories"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
              transactions={transactions}
            />

            <SettingsContainerItem
              items={accounts}
              header={"Accounts"}
              onClickItem={onClickItem}
              onClickToggle={onClickToggle}
              transactions={transactions}
            />
          </>
        : null}

      <Popup>
        <SettingsPopup
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

export default SettingsContainer;
