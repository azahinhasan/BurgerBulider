import React,{ Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';


const Ingredient_Price ={
    salad:5,
    bacon:6,
    cheese:7,
    meat:10
};

class BurgerBuilder extends Component{

    
    state ={
        ingredients: {  //its a abject
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
         },
         totalPrice :4,
         purchasable: false,
         purchasing : false

    }

    

    upadtePurcheseState(ingredients){
        //const ingredients ={ ...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) =>{ return sum+el;},0);

        this.setState({purchasable: sum>0});
    }

    addIngredientHandler =(type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients ={ ...this.state.ingredients};
        updatedIngredients[type]= updatedCount;

        const priceAddition = Ingredient_Price[type];
        const oldPrice = this.state.totalPrice;
        const upadtedPrice = oldPrice + priceAddition;

        this.setState({totalPrice : upadtedPrice ,ingredients : updatedIngredients});

        this.upadtePurcheseState(updatedIngredients);

    }

    removeIngredientHendler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount-1;
        const updatedIngredients ={ ...this.state.ingredients};
        updatedIngredients[type]= updatedCount;

        const priceAddition = Ingredient_Price[type];
        const oldPrice = this.state.totalPrice;
        const upadtedPrice = oldPrice - priceAddition;

        this.setState({totalPrice : upadtedPrice ,ingredients : updatedIngredients});

        this.upadtePurcheseState(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    closeModalHandaler =() =>{
        this.setState({purchasing : false});
    }

    purchaseContinueHandler=()=>{
        alert('You COntinue!');
    }

    render(){
        const disableInfo ={
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        } //{salad: true , meat: false ......}
        
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.closeModalHandaler}>
                    <OrderSummery ingredients={this.state.ingredients}
                    purchaseCanclled={this.closeModalHandaler}
                    purchaseContinued={this.purchaseContinueHandler}  
                    price ={this.state.totalPrice}

                    />
                </Modal>

                <Burger ingredient={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHendler}
                    disabled={disableInfo}
                    purchasable = {this.state.purchasable}
                    price ={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }


}


export default BurgerBuilder;