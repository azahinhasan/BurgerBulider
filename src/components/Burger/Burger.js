import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngeradins/BurgerIngredient';


const burger =(props) =>{

    const transformedIngredients=Object.keys(props.ingredient).map(igKey =>{
            return [...Array(props.ingredient[igKey])].map((_, i) =>{
               return <BurgerIngredient key={igKey+i} type={igKey} />;
            });
    });
    return(
        <div className ={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;

