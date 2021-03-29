import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/LogOut';
//npm install --save axios
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
// npm install --save react-router-dom

import CheckOut from './containers/CheckOut';
import Orders from './containers/Orders';
import { connect } from 'react-redux';
import * as action from './store/actions/index';


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes =(
        <Switch>
            <Route path="/auth"  component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
          </Switch>
    )

    if(this.props.isAuthenticated){
      routes=(<Switch>
            <Route path="/checkout"  component={CheckOut}/> 
            <Route path="/orders"  component={Orders}/>
            <Route path="/logout"  component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/" />
        </Switch>)
    }
    return (
      <div className="">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const npmStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp:()=> dispatch(action.authCheckState())
  }
}

export default withRouter(connect(npmStateToProps,mapDispatchToProps)(App));



/*event.preventDefault()?
hooks?
 */