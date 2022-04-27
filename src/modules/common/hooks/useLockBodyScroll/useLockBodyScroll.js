import {useLayoutEffect} from "react";

export function useLockBodyScroll(isShow) {
    useLayoutEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      isShow ? document.body.style.overflow = "hidden" : null;
      
      return () => (document.body.style.overflow = originalStyle);
    }, [isShow]); 
  }