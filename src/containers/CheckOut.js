import React, { Component } from 'react';

import CheckoutSummary from '../components/Burger/CheckOutSummery/CheckOutSummery';
import {Redirect, Route} from 'react-router-dom';
import ContactData from '../containers/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     /*getting data extracing from 
    //     http://localhost:3001/checkout?bacon=0&cheese=1&meat=1&salad=1
    //     */
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()) {
    //         //['salad','1']
    //         if(param[0] === 'price'){
    //             price=param[1];
    //         }else{
    //             ingredients[param[0]] =+param[1]; 
    //         }
           
    //         // '+' converting it into nimber
    //         //salad adding


    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price});


    // }


    checkoutCancelled =()=>{
        this.props.history.goBack();
    }

    checkoutContinued =()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary=<Redirect to="/"/>
        if(this.props.ings){
            summary=(            
                <div>
                    <CheckoutSummary 
                    //ingredient={this.state.ingredients}
                    ingredient={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    />
                    <Route
                    path={this.props.match.path+'/contact-data'} 
                    // component={ContactData}
                    // render={(props)=>(<ContactData ingredients={this.state.ingredients} 
                    //  price={this.state.totalPrice} {...props}/>)}
                    component={ContactData}
                    />
                </div>)
        }
        return (
            <div>
                {summary}
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);