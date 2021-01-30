import React from 'react';
import Aux from '../../../hoc/Auxx';

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
            <p>CheckOut?</p>
        </Aux>
    )
};

export default orderSimmary;