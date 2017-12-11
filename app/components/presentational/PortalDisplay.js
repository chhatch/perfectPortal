import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import PortalToolBar from "./PortalToolBar.js"
import Home from "./Home.js"
import ItemAppDisplay from "../../productTerminal/components/presentational/ItemAppDisplay.js"
import UploaderDisplay from "../../picUploader/components/presentational/UploaderDisplay.js"

let PortalDisplay = (props) => {
    return (
            <div>
                <PortalToolBar routeToPath={props.routeToPath}/>
                <Route exact={true} path="/perfectPortal" component={Home}/>
                <Route exact={true} path="/perfectPortal/items" component={ItemAppDisplay}/>
                <Route exact={true} path="/perfectPortal/uploads" component={UploaderDisplay}/>
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
        routeToPath: (path) => {
            dispatch(routerActions.push(path));
        }
    }
}

PortalDisplay = connect(
    mapStateToProps, mapDispatchToProps
    )(PortalDisplay);

 export default PortalDisplay;