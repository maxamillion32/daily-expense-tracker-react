import React, {useState, lazy, Suspense} from "react";
import {useSelector} from "react-redux";

import classes from "./Container.module.css";

import {selectUserId, selectIsDemoAccount} from "../../../reducers/user/user-slice";
import {selectFilteredCategories} from "../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../reducers/accounts/accounts-slice";
import {selectAllTransactionsState} from "../../../reducers/transactions/transactions-slice";

import Loader from "../../common/components/Loader/Loader";
import Popup from "../../common/components/Popup/Popup";
import SettingsPopup from "./Popup/Popup";

function SettingsContainer() {
  const SettingsList = lazy(() => import("./List/List"));

  const userId = useSelector(selectUserId);
  const isDemoAccount = useSelector(selectIsDemoAccount);
  const transactions = useSelector(selectAllTransactionsState);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const userAccount = [{id: userId, title: "Delete account"}];

  const initialItemState = {
    id: "",
    title: "",
    type: "",
    startBalance: 0,
    balance: 0,
    icon: null,
    hidden: false,
    date: new Date().toISOString().slice(0, -14),
    incomes: false,
    transfer: false
  };

  const [item, setItem] = useState(initialItemState);
  const [prevItem, setPrevItem] = useState(initialItemState);
  const [showPopup, setShowPopup] = useState(false);

  const onPopupCloseButtonClick = () => {
      setShowPopup(!showPopup);
  };

  return (
    <section className={classes.Container}>
      {!showPopup && userId
        ? <Suspense fallback={<Loader />}>
            <SettingsList
              items={accounts}
              header={"Accounts"}
              accounts={accounts}
              transactions={transactions}
              setItemState={setItem}
              setPrevItemState={setPrevItem}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              userId={userId}
              state={initialItemState}
            />

            <SettingsList
              items={categories}
              header={"Categories"}
              transactions={transactions}
              setItemState={setItem}
              setPrevItemState={setPrevItem}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              userId={userId}
              state={initialItemState}
            />

            {!isDemoAccount
              ? <SettingsList
                  items={userAccount}
                  header={"User account"}
                  userId={userId}
                  state={initialItemState}

                  showCreateButton={false}
                />
              : null}
          </Suspense>
        : null}


        <Popup
            showPopup={showPopup}
            setShowPopup={onPopupCloseButtonClick}
          >
            <SettingsPopup
              itemState={item}
              prevItemState={prevItem}
              setItemState={setItem}
              transactions={transactions}
              setShowPopup={setShowPopup}
            />
          </Popup>
    </section>
  );
}

export default SettingsContainer;
