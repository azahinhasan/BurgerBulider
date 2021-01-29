import React,{ Component } from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{

    
    state ={
        ingredient: {
            salad:1,
            bacon:1,
            cheese:2,
            meat:2
         }
    }
    render(){
        return(
            <Aux>
                <div>Burger</div>
                <div>Builder Controls</div>

                <Burger ingredient={this.state.ingredient}/>
            </Aux>
        );
    }


}


export default BurgerBuilder;