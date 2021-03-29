import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const inititalState ={
        // ingredients: {  //its a abject
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        // },
    ingredients: null,
    totalPrice :4,
    error:false,
    building:true
    //purchasable:false
};
const Ingredient_Price ={
    salad:5,
    bacon:6,
    cheese:7,
    meat:10,
    loading:false
};

const addIngredient=(state,action)=>{
    const updatedIngredient = { [action.ingredientName]:state.ingredients[action.ingredientName]+1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
            const updatedState={
                ingredients:updatedIngredients,
                totalPrice:state.totalPrice+Ingredient_Price[action.ingredientName],
                building:true

            };
            return updateObject(state,updatedState);
}
const reducer =(state=inititalState,action)=>{

    switch(action.type){


        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action)
            
            //this full part is another way which one by Utility function in utility.js
            //other way shown in blow dwon case

        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1,
                    building:true
                },
                totalPrice:state.totalPrice-Ingredient_Price[action.ingredientName]
            };

        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                //ingredients:action.ingredientName,
                ingredients:{
                    //ordering or mapping manully.Above one will order 
                    // accoding to database
                    salad:action.ingredientName.salad,
                    bacon:action.ingredientName.bacon,
                    meat:action.ingredientName.meat,
                    cheese:action.ingredientName.cheese,
                },
                totalPrice:4,
                error:false,
                building:false
                
            };
        case actionTypes.FETCH_INGREDIENTs_FAILED:
            // return{
            //     ...state,
            //     error:true
                
            // };
            return updateObject(state,{error:true});

        default:
            return state;
    }
};

export default reducer;