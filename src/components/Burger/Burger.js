import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngeradins/BurgerIngredient';


const burger =(props) =>{

    let transformedIngredients=Object.keys(props.ingredient).map(igKey =>{
        //tranforming object in a Array
        //keys convert given object in to array
       // console.log(igKey + " yo ");
            return [...Array(props.ingredient[igKey])].map((_, i) =>{
               // console.log(props.ingredient[igKey] + " yo0  ");
                // _ mean blank and i is the index of the el ment
               return <BurgerIngredient key={igKey+i} type={igKey} />;
            })



    }).reduce((arr,el) =>{ return arr.concat(el) },[]);
    /*reduce is a bulid in function which is allows us
    transform array into something else*/
     /* 'arr' is previous value of array and 'el' is the current value 
    which is pass by default react*/
    /*inside {} call back and [] is initial value*/
    
    if(transformedIngredients.length == 0){
        transformedIngredients= <p>Please Choose Ingredients!</p>;
    }
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

