import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setIsButtonShow, isAddButtonClick} from "../../../../reducers/transactions/transactions-slice";

function WithNavigation({children}) {
  const getIsAddButtonClick = useSelector(isAddButtonClick);
  const dispatch = useDispatch();

  const handleNavigation = (event) => {
      if (event.deltaY > 0) {
          dispatch(setIsButtonShow(false));
      } else if (event.deltaY < 0) {
          dispatch(setIsButtonShow(true));
      }
  };

  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if ( xDiff > 0 ) {
               //left swipe
          } else {
              //right swipe
          }
      } else {
          if ( yDiff > 0 ) {
            dispatch(setIsButtonShow(false)); //up swipe
            console.log("🚀 ~ file: WithNavigation.js ~ line 50 ~ handleTouchMove ~ up swipe", "up swipe");
          } else {
            dispatch(setIsButtonShow(true)); //down swipe
            console.log("🚀 ~ file: WithNavigation.js ~ line 53 ~ handleTouchMove ~ down swipe", "down swipe");
          }
      }
      //reset values
      xDown = null;
      yDown = null;
  }

  useEffect(() => {
    document.addEventListener("wheel", handleNavigation, false);
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    if (getIsAddButtonClick) {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    }
    return () => {
      document.removeEventListener("wheel", handleNavigation, false);
      document.removeEventListener("touchstart", handleTouchStart, false);
      document.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, [getIsAddButtonClick]);

  return (children);
}

export default WithNavigation;
