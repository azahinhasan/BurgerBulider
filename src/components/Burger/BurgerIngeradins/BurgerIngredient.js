import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropType from 'prop-types';
//npm install --save prop-tupes

class BurgerIngredient extends Component{

    render(){
    let ingredient = null;

    switch(this.props.type){  //for class based this.props.type and for function base props.type
        case('bread-bottom'):
            ingredient=<div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient=(
                <div className={classes.BreadTop}>
                    <div className={classes.Seed1}></div>
                    <div className={classes.Seed2}></div>
                </div>
                );
            break;
        case('meat'):
            ingredient=<div className={classes.Meat}></div>;
            break;
        case('cheese'):
            ingredient=<div className={classes.Cheese}></div>;
            break;
        case('salad'):
            ingredient=<div className={classes.Salad}></div>;
            break;
        case('bacon'):
            ingredient=<div className={classes.Bacon}></div>;
            break;
        default:
            ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propType={
    type: PropType.string.isRequired
};

export default BurgerIngredient;