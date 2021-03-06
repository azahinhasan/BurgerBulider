import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems =(props) =>(
    <ul className={classes.NavigationItems}>
        {/*For boolian we can write only active exepct ={true}*/}
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>

        {props.isAuth? <NavigationItem link="/orders" >Orders</NavigationItem> : null}

        { !props.isAuth ? <NavigationItem link="/auth" >Auth</NavigationItem>
            : <NavigationItem link="/logout" >LogOut</NavigationItem>}
    </ul>
);

export default navigationItems;

