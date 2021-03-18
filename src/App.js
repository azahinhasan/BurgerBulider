import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//npm install --save axios
import {Route} from 'react-router-dom';
// npm install --save react-router-dom

import CheckOut from './containers/CheckOut';
import Orders from './containers/Orders';


class App extends Component {
  render() {
    return (
      <div className="">
        <Layout>
            <Route path="/checkout"  component={CheckOut}/> 
            <Route path="/orders" exact component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
        </Layout>
      </div>
    );
  }
}

export default App;
