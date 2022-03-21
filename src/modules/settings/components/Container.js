import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";

import {selectUserId} from "../../../reducers/user/user-slice";
import {isCategoriesLoading, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {isAccountsLoading, selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";
import {selectAllTransactionsState, loadTransactions} from "../../../reducers/transactions/transactions-slice";

import Loader from "../../common/components/Loader/Loader";
import SettingsList from "./List/List";

import Popup from "../../common/components/Popup/Popup";
import SettingsPopup from "./Popup/Popup";

function SettingsContainer() {
  const userId = useSelector(selectUserId);
  const transactions = useSelector(selectAllTransactionsState);
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const loadingCategories = useSelector(isCategoriesLoading);
  const loadingAccounts = useSelector(isAccountsLoading);
  const dispatch = useDispatch();

  const isLoader = (loadingCategories || loadingAccounts) && userId;

  useEffect(() => {
    dispatch(loadTransactions(userId));
  }, [userId]);

  const initialItemState = {
    id: "",
    title: "",
    type: "",
    startBalance: 0,
    balance: 0,
    icon: null,
  };

  const [item, setItem] = useState(initialItemState);
  const [prevItem, setPrevItem] = useState(initialItemState);
  const [showPopup, setShowPopup] = useState(false);

  const onPopupCloseButtonClick = () => {
      setShowPopup(!showPopup);
  };

  return (
    <section className={classes.Container}>
      {isLoader ? <Loader /> : null}
      {userId
        ? <>
            <SettingsList
              items={accounts}
              header={"Accounts"}
              accounts={accounts}
              transactions={transactions}
              setItem={setItem}
              setPrevItem={setPrevItem}
              showPopup={showPopup}
              setShowPopup={onPopupCloseButtonClick}
              userId={userId}
              state={initialItemState}
            />

            <SettingsList
              items={categories}
              header={"Categories"}
              transactions={transactions}
              setItem={setItem}
              setPrevItem={setPrevItem}
              showPopup={showPopup}
              setShowPopup={onPopupCloseButtonClick}
              userId={userId}
              state={initialItemState}
            />
          </>
        : null}

      <Popup
        showPopup={showPopup}
        setShowPopup={onPopupCloseButtonClick}
      >
        <SettingsPopup
          itemState={item}
          prevItem={prevItem}
          setItem={setItem}
          transactions={transactions}
          setShowPopup={onPopupCloseButtonClick}
        />
      </Popup>
    </section>
  );
}

export default SettingsContainer;
