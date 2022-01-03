import React, {useContext, useState} from 'react';
const PopupContext = React.createContext();

export const usePopup = () => {
  return useContext(PopupContext);
}

function PopupProvider(props) {
  const [popup, setPopup] = useState(false);
  const toggle = () => setPopup(prev => !prev);

  return (
    <PopupContext.Provider value={{
        visible: popup,
        toggle
      }}>
        {props.children}
    </PopupContext.Provider>
  )
}

export default PopupProvider;
