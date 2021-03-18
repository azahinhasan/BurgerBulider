import React, { Component } from 'react';
import Order from './Order';
import axios from '../axios-orders';
import withErrorHandler from '../../src/hoc/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({       //puting get value in arrayyyyyyyy
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render(){
        return (
            
            <div>
                 {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);