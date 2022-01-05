import React from 'react';
import {useSelector} from 'react-redux';
import SettingsScreen from '../../components/Settings/Settings'
import classes from './Settings.module.css';
import PopupProvider from '../../hoc/Popup/PopupContext';
import Popup from '../../hoc/Popup/Popup';
import {selectUserId} from '../../reducers/user/user-slice';


function Settings() {
  const userId = useSelector(selectUserId);
  return (
    <section className={classes.Settings}>
      {userId && <PopupProvider>
        <SettingsScreen />
        <Popup>
          <h1>Example</h1>
        </Popup>
      </PopupProvider>}
    </section>
  )
}

export default Settings;
