import React,{Component} from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';






class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler =()=>{
        this.setState({showSideDrawer: false});
    }


    sideDrawerToggleHandler =()=>{
        //this.setState({showSideDrawer: !this.sate.showSideDrawer});
        // ^it can become unexpect outcome so dont use it..Such as: false replace with 0/1
        this.setState((preState) =>{
            return{showSideDrawer: !preState.showSideDrawer};
        });
    }




    render(){
        return (
            <Aux>
            <Toolbar drawerToggle={this.sideDrawerToggleHandler}/>
            <SideDrawer 
            closed={this.sideDrawerClosedHandler}
            open={this.state.showSideDrawer}
            />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
        
    }
}








export default Layout;