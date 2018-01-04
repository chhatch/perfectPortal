//main.js
//npm run build
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {Link, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import reduxCatch from 'redux-catch'
import StackTrace from 'stacktrace-js'
import {GoogleAPI} from 'react-google-oauth'

import { actionLogger } from "./middleware/actionLogger.js"
import { appReducer } from "./reducers/portalReducer.js"
import { googleSignIn, googleSignOut } from "./actions/actions.js"
import PortalDisplay from "./components/PortalDisplay.js";

const tempHandler = (error, getState, lastAction) => {
    StackTrace.fromError(error).then((st) => console.error("**Temporary Error Handler**\n" + error.message + "\n" + st));
}

// ========================================
    const history = createHistory();
    const store = createStore(appReducer,
        applyMiddleware(reduxCatch(tempHandler), actionLogger, routerMiddleware(history), thunkMiddleware)),
        onSignIn = (status) => {
            if (status) {
                store.dispatch(googleSignIn);
            } else {
                store.dispatch(googleSignOut);
            }
        }    
                
    // Create an enhanced history that syncs navigation events with the store
    ReactDOM.render(
        <GoogleAPI clientId="568076525910-ppfurf2g2htmetp48gjfk4h2havmmu12.apps.googleusercontent.com"
            onUpdateSigninStatus={(status) => onSignIn(status)}
            onInitFailure={onSignIn} >
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <PortalDisplay/>
                </ConnectedRouter>
            </Provider>
        </GoogleAPI>,
        document.getElementById("root")
    );
    
    // Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)