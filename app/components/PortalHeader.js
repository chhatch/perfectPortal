//import styles from "./ItemDisplay.css"
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignInContainer from "./SignInContainer.js"
import RouteButton from "./RouteButton.js"
import styles from "../css modules/portal.css"

const PortalHeader = (props) => {
    return (
        <div className={styles.portalHeader}>
            <SignInContainer />
            <RouteButton title="Home" path="/perfectPortal/home" app="homeApp" routeToApp={props.routeToApp} />
            <RouteButton title="Items" path="/perfectPortal/items" app="itemsApp" routeToApp={props.routeToApp} />
            <RouteButton title="Uploads" path="/perfectPortal/uploads" app="uploaderApp" routeToApp={props.routeToApp} />
        </div>
    );
}

 export default PortalHeader;