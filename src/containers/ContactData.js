import React, { Component } from 'react';
import Button from '../../src//components/UI/Button';
import Spinner from '../../src//components/UI/Spiner';
import classes from './ContactData.css';
import axios from '../../src/axios-orders';
import Input from '../../src//components/UI/input';

class ContactData extends Component {
    state={

            orderForm:{
                    name:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your Name'
                        },
                        value:''
                    },
                    street:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'street Name'
                        },
                        value:''
                    },
                    zipCode:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Zip Code'
                        },
                        value:''
                    },
                    country: {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Country Name'
                        },
                        value:''
                    },
                    email: {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Email'
                        },
                        value:''
                    },
                    deliveryMethod: {
                        elementType:'select',
                        elementConfig:{
                            options:[
                                {value:'faster',displayValue:'Fasterst'},
                                {value:'cheapest',displayValue:'Cheapest'}
                            ]
                        },
                        value:''
                    },
                
            },
        
        loading: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData={};
        for(let element in this.state.orderForm){
            formData[element] = this.state.orderForm[element].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price:this.props.price,
            orderData: formData

        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );

    }

    inputChangeHandler=(event,key)=>{
        const updatedOrdrFrom={
            ...this.state.orderForm
        }
        const updatedFormElement ={...updatedOrdrFrom[key]};

        updatedFormElement.value =event.target.value;
        updatedOrdrFrom[key]=updatedFormElement;
        this.setState({orderForm :updatedOrdrFrom });

    }

    render(){
        let forElemantArray=[];
        for(let key in this.state.orderForm){
            forElemantArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input inputtype="input"  type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input"  type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input"  type="text" name="street" placeholder="Street" />
                <Input inputtype="input"  type="text" name="postal" placeholder="Postal Code" /> */}
                
                {forElemantArray.map(forElemant => (
                    <Input
                    key={forElemant.id} 
                    elementType={forElemant.config.elementType} 
                    elementConfig={forElemant.config.elementConfig}  
                    value={forElemant.config.value} 
                    changed={(event)=>this.inputChangeHandler(event,forElemant.id)}/>
                ))}

                <Button  btnType="Success" >ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form=<Spinner/>;
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;