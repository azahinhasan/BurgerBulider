import React, { Component } from 'react';
import Order from './Order';
import axios from '../axios-orders';
import withErrorHandler from '../../src/hoc/withErrorHandler';
import * as action from '../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

    state = {
        // orders: [],
        // loading: true
    }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({       //puting get value in arrayyyyyyyy
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });

        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        return (
            
            <div>
                 {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
                {/* <Order/>
                <Order/> */}
            </div>
        );
    }
}

const npmStateToProps = state =>{
    return{
        orders:state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders: (token,userId)=>{
            dispatch(action.fetchOrders(token,userId))
        }
    }
}

export default connect(npmStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));