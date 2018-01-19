import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import SignInContainer from "./SignInContainer.js"
import RouteButton from "./RouteButton.js"
import styles from "../css modules/portal.css"

const PortalHeader = (props) => {
    console.log(props.path);
    return (
        <div className={styles.portalHeader}>
            <SignInContainer />
            <div className={styles.routeButtonsContainer}>
                <RouteButton title="Home" buttonPath="/perfectPortal" app="homeApp" routeToApp={props.routeToApp} appPath={props.appPath}/>
                <RouteButton title="Items" buttonPath="/perfectPortal/items" app="itemsApp" routeToApp={props.routeToApp} appPath={props.appPath}/>
                <RouteButton title="Uploads" buttonPath="/perfectPortal/uploads" app="uploaderApp" routeToApp={props.routeToApp} appPath={props.appPath}/>
            </div>
        </div>
    );
}

 export default PortalHeader;