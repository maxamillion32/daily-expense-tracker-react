import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setIsAddButtonClick, isAddButtonClick} from "../../../../reducers/navigation/navigation-slice";

export default function ScrollToTop() {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const getIsAddButtonClick = useSelector(isAddButtonClick);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (getIsAddButtonClick) {
      dispatch(setIsAddButtonClick());
    }
  }, [pathname]);

  return null;
}
