import * as actionTypes from '../actions/actionTypes';

const inititalState ={
        // ingredients: {  //its a abject
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        // },
        ingredients: null,
    totalPrice :4,
    error:false
    //purchasable:false
};
const Ingredient_Price ={
    salad:5,
    bacon:6,
    cheese:7,
    meat:10,
    loading:false
};

const reducer =(state=inititalState,action)=>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+Ingredient_Price[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
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
                error:false
                
            };
        case actionTypes.FETCH_INGREDIENTs_FAILED:
            return{
                ...state,
                error:true
                
            };
            default:
                return state;
    }
};

export default reducer;