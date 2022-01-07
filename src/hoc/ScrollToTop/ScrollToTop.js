import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {clickButton, isButtonClick} from "../../reducers/transactions/transactions-slice";

export default function ScrollToTop() {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const clickAddButton = useSelector(isButtonClick);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (clickAddButton) {
      dispatch(clickButton());
    }
    // eslint-disable-next-line
  }, [pathname]);

  return null;
}
