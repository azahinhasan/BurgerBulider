import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button';





const orderSimmary =(props) =>{


    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
                return <li>
                            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                        </li>
        })

        
    return(
        <Aux>
            <h3>Your Order: </h3>
            <p>Burger with the follwoing ingreadiets: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>CheckOut?</p>
            <Button btnType="Danger" clicked={props.purchaseCanclled}>CENCLE</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSimmary;