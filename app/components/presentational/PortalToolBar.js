//import styles from "./ItemDisplay.css"
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignInContainer from "../container/SignInContainer.js"
import RouteButton from "./RouteButton.js"

const PortalToolBar = (props) => {
    return (
        <div>
            <SignInContainer />
            <RouteButton title="Home" path="/perfectPortal" routeToPath={props.routeToPath} />
            <RouteButton title="Items" path="/perfectPortal/items" routeToPath={props.routeToPath} />
            <RouteButton title="Uploads" path="/perfectPortal/uploads" routeToPath={props.routeToPath} />
        </div>
    );
}

 export default PortalToolBar;