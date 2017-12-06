//main.js
//npm run build
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxCatch from 'redux-catch';
import thunkMiddleware from 'redux-thunk'
import StackTrace from 'stacktrace-js'
import itemAppReducer from "./productTerminal/reducers/itemAppReducer.js"
import PortalDisplay from "./components/presentational/PortalDisplay.js";

const tempHandler = (error, getState, lastAction) => {
    StackTrace.fromError(error).then((st) => console.error(st));
}

// ========================================
    let store = createStore(itemAppReducer, applyMiddleware(reduxCatch(tempHandler), thunkMiddleware));
    ReactDOM.render(
        <Provider store={store}>
            <PortalDisplay/>
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
