import React from 'react';
import SettingsScreen from '../../components/Settings/Settings'
import classes from './Settings.module.css';
import PopupProvider from '../../hoc/Popup/PopupContext';
import Popup from '../../hoc/Popup/Popup';

function Settings() {
  return (
    <section className={classes.Settings}>
      <PopupProvider>
        <SettingsScreen />
        <Popup />
      </PopupProvider>
    </section>
  )
}

export default Settings;
