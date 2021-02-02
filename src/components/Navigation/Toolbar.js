import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';
import DrawerToggle from '../Navigation/DrawerToggle';


const toolbar =(props) =>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggle}/>
        <Logo height="80%"/>
        <nav className={classes.DestopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);



export default toolbar;