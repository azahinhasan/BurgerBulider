import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
// npm install --save react-router-dom
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose, combineReducers } from 'redux';
//npm install --save redux react-redux
import thunk from 'redux-thunk';
//npm install --save redux-thunk

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';


const rootReducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderReducer
});

/*   Flowing some part are for redux dev tools */
//const store = createStore(burgerBuilderReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    should follow this if there is no middleware
*/



let composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));
/* this part is for middlewhere */

const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
