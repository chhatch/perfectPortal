import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import { routeToApp } from "../actions/actions.js"

import PortalHeader from "./PortalHeader.js"
import Home from "../home/components/Home.js"
import ItemAppDisplay from "../productTerminal/components/ItemAppDisplay.js"
import UploaderDisplay from "../uploader/components/UploaderDisplay.js"
import Loading from "../loading/components/Loading.js"

import styles from "../css modules/portal.css"

let PortalDisplay = (props) => {
    return (
        <div className={styles.portalDisplayWrapper}>
            <div className={styles.portalDisplay}>
                <PortalHeader routeToApp={props.routeToApp} appPath={props.routing.location.pathname}/>
                <Loading/>
                <Route exact={true} path="/" component={Home}/>
                <Route exact={true} path="/items" component={ItemAppDisplay}/>
                <Route exact={true} path="/uploads" component={UploaderDisplay}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        routing: state.routing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        routeToApp: (path, app) => {
            dispatch(routeToApp(path, app));
        }
    }
}

PortalDisplay = connect(
    mapStateToProps, mapDispatchToProps
    )(PortalDisplay);

 export default PortalDisplay;