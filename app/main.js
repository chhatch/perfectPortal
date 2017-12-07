//main.js
//npm run build
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {Link, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import reduxCatch from 'redux-catch';
import StackTrace from 'stacktrace-js'

import itemAppReducer from "./productTerminal/reducers/itemAppReducer.js"
import PortalDisplay from "./components/presentational/PortalDisplay.js";

const tempHandler = (error, getState, lastAction) => {
    StackTrace.fromError(error).then((st) => console.error("**Temporary Error Handler**\n" + st));
}

// ========================================
    const history = createHistory();
    const store = createStore(combineReducers({
        itemAppReducer,
        routing: routerReducer
        }),
        applyMiddleware(reduxCatch(tempHandler), routerMiddleware(history), thunkMiddleware));
    // Create an enhanced history that syncs navigation events with the store
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <PortalDisplay/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById("root")
    );
    
    // Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
