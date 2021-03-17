import React from 'react';
import Burger from '../Burger';
import classes from './CheckOutSummery.css';
import Button from '../../UI/Button';

const checkOutSummery = (props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h2>We Hope It Testes well!!!</h2>
            <div style={{width: '300px',margin:'auto'}}>
                <Burger ingredient={props.ingredient}/>
            </div>
            <Button 
            btnType="Danger" 
            clicked={props.checkoutCancelled}>CENCEL</Button>

            <Button 
            btnType="Success" 
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkOutSummery;