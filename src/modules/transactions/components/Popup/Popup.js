import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  selectIsTransactionTypeClick, setIsAddButtonClick, setIsButtonShow,
  setIsTransactionTypeClick
} from "../../../../reducers/navigation/navigation-slice";
import {setIsEditing, setIsTransfer} from "../../../../reducers/transactions/transactions-slice";
import Popup from "../../../common/components/Popup/Popup";
import TransactionCreateForm from "../CreateForm/Form";


function CreateFormPopup() {
  const isPopupShow = useSelector(selectIsTransactionTypeClick);
  const dispatch = useDispatch();

  const handlePopupClose = () => {
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsAddButtonClick(false));
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));
    dispatch(setIsTransfer(false));
  };

  return (
    <Popup
      showPopup={isPopupShow}
      setShowPopup={handlePopupClose}>
      <TransactionCreateForm />
    </Popup>);
}

export default CreateFormPopup;
