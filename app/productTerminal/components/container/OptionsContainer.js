import { connect } from 'react-redux'
import OptionsDisplay from "../presentational/OptionsDisplay.js";

const mapStateToProps = state => {
    return {
        criteria: state.criteria
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

const OptionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionsDisplay);

export default OptionsContainer;