import React from 'react';
import classes from './Dummy.module.css';

function Dummy() {
  return (

    <section className={classes.DummyWrapper}>
      <div className={classes.Dummy} style={{height: 'calc(100vh - 100px)'}}>
        Coming soon...
      </div>
    </section>
  )
}

export default Dummy;
