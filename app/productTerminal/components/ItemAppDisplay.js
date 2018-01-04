//api calls here
const path = require('path');
import OptionsContainer from "./OptionsContainer.js";
import ItemsContainer from "./ItemsContainer.js";
import SignInContainer from "./SignInContainer.js";
import styles from "./ItemAppDisplay.css"

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