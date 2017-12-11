//api calls here
const path = require('path');
import OptionsContainer from "\\productTerminal\\components\\container\\OptionsContainer.js";
import ItemsContainer from "\\productTerminal\\components\\container\\ItemsContainer.js";
import SignInContainer from "\\components\\container\\SignInContainer.js";
import styles from "\\productTerminal\\components\\presentational\\ItemAppDisplay.css"

class ItemAppDisplay extends React.Component {
    constructor(props) {
        super(props);
        console.log(React.version);
        this.state = {hasError: false};
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    DOH!!
                </div>
            );
        } else {
            return ( 
                <div className={styles.ItemAppContainer}>
                    <OptionsContainer />
                    <ItemsContainer />
                </div>
            );
        }
    }
    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }
}
 export default ItemAppDisplay;