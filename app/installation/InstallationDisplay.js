import { connect } from 'react-redux'
import Installation from "../presentational/Installation.js"

let UploaderDisplay = (props) => {
    return (
        <div>
            < Installation />
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

InstallationDisplay = connect(
    mapStateToProps,
    mapDispatchToProps
    )(InstallationDisplay);

export default UploaderDisplay;