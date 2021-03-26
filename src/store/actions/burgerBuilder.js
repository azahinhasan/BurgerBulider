import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
};

export const removeIngredient = name =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
};

export const setIngredients = ingreients =>{
    return{
        type:actionTypes.SET_INGREDIENT,
        ingredientName:ingreients
    }
}

export const fatchIngredientFailed=() =>{
    return{
        type:actionTypes.FETCH_INGREDIENTs_FAILED,
    }
}


export const initIngredients =()=>{
    return dispatch=>{
        axios.get('https://react-my-burger-8e4ce-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data))
        })
        .catch(
            error=>{
                dispatch(fatchIngredientFailed())
            });
    }
};