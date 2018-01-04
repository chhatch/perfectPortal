import {GoogleLogin,GoogleLogout} from 'react-google-oauth'
import styles from '../../css modules/signInDisplay.css';

class SignInDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(props) {
        if(this.props.signedIn) {
            return ""
        } else {
            return (
            <div className={styles.signInDisplay} >
                < GoogleLogin backgroundColor="gray" text="Sign In" width="140px"/>
                < GoogleLogout backgroundColor="gray" text="Sign Out" width="150px"/>
            </div>
            );
        }
    }
}

 export default SignInDisplay;