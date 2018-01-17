import { connect } from 'react-redux'
import { googleSignIn } from "../actions/actions.js"
import {GoogleLogin,GoogleLogout} from 'react-google-oauth'
import styles from '../css modules/signInContainer.css';

class SignInContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(props) {
        console.log(this.props);
        if(this.props.signedIn) {
            return (
            <div className={styles.signInDisplay} >
                < GoogleLogout backgroundColor="gray" text="Sign Out" width="150px"/>
            </div>
            )
        } else {
            return (
            <div className={styles.signInDisplay} >
                < GoogleLogin backgroundColor="gray" text="Sign In" width="140px"/>
            </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        signedIn: state.portal.signedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => {
            dispatch(googleSignIn());
        }
    }
}

SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContainer);

export default SignInContainer;