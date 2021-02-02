import React from 'react';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../../components/Navigation/NavigationItems';
import  classes from './SideDrawer.css';
import Backdrop from "../../components/UI/Backdrop";
import Aux from "../../hoc/Auxx";


const sideDrawer=(props)=>{

    let attachedClasses =[classes.SideDrawer , classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>

        <Backdrop show={props.open}  modalClosed ={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height ="11%" className={classes.Logo}/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>

        </Aux>
    );
}


export default sideDrawer;