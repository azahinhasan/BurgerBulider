import React from 'react';
import classes from './Backdrop.css';




const backDrop =(props)=>( props.show ? <div className={classes.Backdrop} onClick={props.modalClosed}></div> : null );

export default backDrop;