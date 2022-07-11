import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setIsAddButtonClick, selectIsAddButtonClick} from "../../../../reducers/navigation/navigation-slice";

export default function ScrollToTop() {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const isAddButtonClick = useSelector(selectIsAddButtonClick);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAddButtonClick) {
      dispatch(setIsAddButtonClick(false));
    }
  }, [pathname]);

  return null;
}
