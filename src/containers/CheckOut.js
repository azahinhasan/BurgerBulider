import React, { Component } from 'react';

import CheckoutSummary from '../components/Burger/CheckOutSummery/CheckOutSummery';
import {Route} from 'react-router-dom';
import ContactData from '../containers/ContactData';

class Checkout extends Component {

    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        /*getting data extracing from 
        http://localhost:3001/checkout?bacon=0&cheese=1&meat=1&salad=1
        */
        const ingredients={};
        for(let param of query.entries()) {
            //['salad','1']
            ingredients[param[0]] =+param[1]; 
            // '+' converting it into nimber
            //salad adding
        }
        this.setState({ingredients:ingredients});
    }
    checkoutCancelled =()=>{
        this.props.history.goBack();
    }

    checkoutContinued =()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            
            <div>
                <CheckoutSummary 
                ingredient={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}
                />
                <Route
                path={this.props.match.path+'/contact-data'} 
                 component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;