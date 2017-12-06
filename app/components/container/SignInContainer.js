import { connect } from 'react-redux'
import SignInDisplay from "../presentational/SignInDisplay.js"
import { googleSignIn } from "../../productTerminal/actions\\actions.js"

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: () => {
            dispatch(googleSignIn());
        }
    }
}

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInDisplay);

export default SignInContainer;