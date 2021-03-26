import React,{ Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
//npm install --save axios
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spiner';
import withErrorHandler from '../../hoc/withErrorHandler';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as burgerBuilderActions from '../../store/actions/index';

import {connect} from 'react-redux';


// const Ingredient_Price ={
//     salad:5,
//     bacon:6,
//     cheese:7,
//     meat:10,
//     loading:false
// };

class BurgerBuilder extends Component{

    
    state ={
        purchasable: false,
        purchasing : false,

    }

    
    componentDidMount(){
       this.props.onIngredient();
    }

    upadtePurcheseState(ingredients){
        //const ingredients ={ ...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) =>{ return sum+el;},0);

        //this.setState({purchasable: sum>0});
        return sum>0;
    }

    // addIngredientHandler =(type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngredients ={ ...this.state.ingredients};
    //     updatedIngredients[type]= updatedCount;

    //     const priceAddition = Ingredient_Price[type];
    //     const oldPrice = this.state.totalPrice;
    //     const upadtedPrice = oldPrice + priceAddition;

    //     this.setState({totalPrice : upadtedPrice ,ingredients : updatedIngredients});

    //     this.upadtePurcheseState(updatedIngredients);

    // }

    // removeIngredientHendler = (type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount-1;
    //     const updatedIngredients ={ ...this.state.ingredients};
    //     updatedIngredients[type]= updatedCount;

    //     const priceAddition = Ingredient_Price[type];
    //     const oldPrice = this.state.totalPrice;
    //     const upadtedPrice = oldPrice - priceAddition;

    //     this.setState({totalPrice : upadtedPrice ,ingredients : updatedIngredients});

    //     this.upadtePurcheseState(updatedIngredients);
    // }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    closeModalHandaler =() =>{
        this.setState({purchasing : false});
    }

    purchaseContinueHandler=()=>{
        //alert('You COntinue!');
   
       // this.setState({loading: true});

        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Zahin',
        //         address:{
        //             street: 'Mirpur',
        //             country:'BD'
        //         },
        //         email:'aaa@test.com'
        //     },
        //     deliveryMethod: 'fasttest'
        // }
        // axios.post('/orders.json',order)
        // .then(
        //     respose => console.log(respose),
        //     this.setState({loading: false , purchasing: false})
        // )
        // .catch(
        //     error => console.log(error),
        //     this.setState({loading: false, purchasing: false})
        // );
        // const queryParams=[];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        //     //encodeURIComponent encode convart the element to usable in URL
        //     //convart critical elemnets to non-critical elements
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const querystring= queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+querystring
        //     /*its make the url looklike this
        //     http://localhost:3001/checkout?bacon=0&cheese=1&meat=1&salad=1
        //     */
        // });

        this.props.history.push('/checkout');
    }






    render(){
        const disableInfo ={
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        } //{salad: true , meat: false ......}
        
        let orderSummery = null;

        // if(this.state.loading){
        //     orderSummery=<Spinner/>
        // }

        let burger;
        burger= this.props.error ? <p>Cant connect with server! </p> : <Spinner/>
                // ^if there is error chage link in componentDidMount to see the effect
        
         if(this.props.ings){
           
            burger= (
                <Aux>
                    <Burger ingredient={this.props.ings}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        purchasable = {this.upadtePurcheseState(this.props.ings)}
                        price ={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>      
            );
                    
        orderSummery =<OrderSummery 
            ingredients={this.props.ings}
            purchaseCanclled={this.closeModalHandaler}
            purchaseContinued={this.purchaseContinueHandler}  
            price ={this.props.price}/>
        }

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.closeModalHandaler}>
                    {orderSummery}
                </Modal>

                {burger}
            </Aux>
        );
    }


}

const mapStateToProps = state =>{
    return {
        
        ings:state.burgerBuilder.ingredients, //this proses called fatch
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
    };
}
const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded:(ingName)=>dispatch(
            // type:actionTypes.ADD_INGREDIENT,
            // ingredientName:ingName
            burgerBuilderActions.addIngredient(ingName)
        ),
        onIngredientRemove:(ingName)=>dispatch(
            // type:actionTypes.REMOVE_INGREDIENT,
            // ingredientName:ingName
            burgerBuilderActions.removeIngredient(ingName)
        ),
        onIngredient:()=>dispatch(
            burgerBuilderActions.initIngredients())
        
        
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));