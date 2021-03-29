import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSucess=(id,orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCESS,
        orderId:id,
        orderData:orderData
    }
};

export const purchaseBurgerFail=(error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
};

export const purchaseBurgerStart=() =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData,token) =>{

    
    return dispatch => {
        dispatch(purchaseBurgerStart())

        axios.post(  '/orders.json?auth=' + token, orderData  )
            .then( response => {
                dispatch(purchaseBurgerSucess(response.data.name,orderData))
                //this.props.history.push('/');
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    }
};

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
};

export const fetchOrderSuccess=(orderData) =>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orderData
    }
};

export const fetchOrderFailed=(error) =>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        orders:error
    }
};

export const fetchOrderStart=(error) =>{
    return{
        type:actionTypes.FETCH_ORDERS_START,
    }
};

export const fetchOrders=(token,userId)=>{
    return (dispatch)=>{
        console.log("token: ",token)
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        
        demoRemove(token,userId);


        axios.get('/orders.json'+queryParams)
        .then(res => {
            console.log("[fetchOrders]: ",res)
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({       //puting get value in arrayyyyyyyy
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrderFailed(err));
        });
    }
}


export const demoRemove=(token,userId)=>{
    const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
    
    axios.delete('/orders.json'+'-MWtQul3AaaDmhVo-Vwf')
        .then(res => {
            console.log("[fetchOrders]: ",res)
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({       //puting get value in arrayyyyyyyy
                    ...res.data[key],
                    id: key
                });
            }   
        })
        .catch(err => {
        });

}
