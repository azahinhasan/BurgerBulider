import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems =(props) =>(
    <ul className={classes.NavigationItems}>
        {/*For boolian we can write only active exepct ={true}*/}
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </ul>
);

export default navigationItems;

