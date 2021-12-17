import React from 'react';
import SettingsScreen from '../../components/Settings/Settings'
import classes from './Settings.module.css';

function Settings() {
  return (
    <section className={classes.Settings}>
      <SettingsScreen />
    </section>
  )
}

export default Settings;
