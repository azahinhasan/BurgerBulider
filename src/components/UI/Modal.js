import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../hoc/Auxx';
import Backdrop from '../UI/Backdrop';




class Model extends Component{

    shouldComponentUpdate(nextProps , nextSate){  
        //it tregar Render. If its false page will not render anything
        //in here used for update performance
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate(){
        console.log('[Model] willUpdate');
    }



    render(){
        return(
            <Aux>
            <Backdrop show={this.props.show} modalClosed={this.props.modalClosed}/>
            <div className={classes.Modal} 
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1':'0'
            }}
            >
            {this.props.children}
            </div>
             </Aux>
        )
    }
}





export default Model;