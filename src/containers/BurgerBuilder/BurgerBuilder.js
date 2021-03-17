import React,{ Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
//npm install --save axios
import axios from '../../axios-orders';
import orderSimmary from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spiner';
import withErrorHandler from '../../hoc/withErrorHandler';


const Ingredient_Price ={
    salad:5,
    bacon:6,
    cheese:7,
    meat:10,
    loading:false
};

class BurgerBuilder extends Component{

    
    state ={
        // ingredients: {  //its a abject
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0
        //  },
        ingredients: null,
        totalPrice :4,
        purchasable: false,
        purchasing : false,
        error:false

    }

    
    componentDidMount(){
        axios.get('https://react-my-burger-8e4ce-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients : response.data})
        })
        .catch(error=>{this.setState({error : true})});
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
        //alert('You COntinue!');
        this.setState({loading: true});

        const order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Zahin',
                address:{
                    street: 'Mirpur',
                    country:'BD'
                },
                email:'aaa@test.com'
            },
            deliveryMethod: 'fasttest'
        }
        // axios.post('/orders.json',order)
        // .then(
        //     respose => console.log(respose),
        //     this.setState({loading: false , purchasing: false})
        // )
        // .catch(
        //     error => console.log(error),
        //     this.setState({loading: false, purchasing: false})
        // );
        const queryParams=[];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
            //encodeURIComponent encode convart the element to usable in URL
            //convart critical elemnets to non-critical elements
        }
        const querystring= queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+querystring
            /*its make the url looklike this
            http://localhost:3001/checkout?bacon=0&cheese=1&meat=1&salad=1
            */
        });
    }






    render(){
        const disableInfo ={
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        } //{salad: true , meat: false ......}
        
        let orderSummery = null;

        if(this.state.loading){
            orderSummery=<Spinner/>
        }


        let burger= this.state.error ? <p>Cant connect with server! </p> : <Spinner/>
                // ^if there is error chage link in componentDidMount to see the effect
        if(this.state.ingredients){
            burger= (
                <Aux>
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
                    
        orderSummery =<OrderSummery ingredients={this.state.ingredients}
            purchaseCanclled={this.closeModalHandaler}
            purchaseContinued={this.purchaseContinueHandler}  
            price ={this.state.totalPrice}/>
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


export default withErrorHandler(BurgerBuilder, axios);