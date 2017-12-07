import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PortalToolBar from "./PortalToolBar.js"
import Home from "./Home.js"
import ItemAppDisplay from "../../productTerminal/components/presentational/ItemAppDisplay.js"

const PortalDisplay = (props) => {
    return (
            <div>
                <PortalToolBar />
                <Route exact={true} path="/home" component={Home}/>
                <Route exact={true} path="/items" component={ItemAppDisplay}/>
            </div>
    );
}

 export default PortalDisplay;