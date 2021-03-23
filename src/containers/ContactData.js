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
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    street:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'street Name'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    zipCode:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Zip Code'
                        },
                        value:'',
                        validation:{
                            required:true,
                            minLength:5,
                            maxLength:5
                        },
                        valid:false,
                        touched:false
                        
                    },
                    country: {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Country Name'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    email: {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Email'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    deliveryMethod: {
                        elementType:'select',
                        elementConfig:{
                            options:[
                                {value:'fasterst',displayValue:'Fasterst'},
                                {value:'cheapest',displayValue:'Cheapest'}
                            ]
                        },
                        value:'Fasterst',
                        validation:{},
                        valid:true,
                    },
                
            },
        
        loading: false,
        formIsValid:false
    }





    checkValidity(value,rules){
        let isValid = true;

        if(!rules){
            return isValid;
        }
        if(rules.required){
            isValid = value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }


    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData={};

        for(let element in this.state.orderForm){
            formData[element] = this.state.orderForm[element].value;
            //soring value in formData
            console.log(element);
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
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;

        updatedOrdrFrom[key]=updatedFormElement;

        let formIsValid=true;

        for(let i in updatedOrdrFrom){

            formIsValid=updatedOrdrFrom[i].valid && formIsValid;

        }
        this.setState({orderForm :updatedOrdrFrom,formIsValid: formIsValid});
        console.log(updatedFormElement);

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
                    invalid={!forElemant.config.valid}
                    shouldValidate={forElemant.config.validation}
                    touched={forElemant.config.touched}
                    changed={(event)=>this.inputChangeHandler(event,forElemant.id)}/>
                ))}

                <Button  btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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