import { connect } from 'react-redux'
import UploaderDisplay from "../presentational/UploaderDisplay.js";
import { withRouter } from 'react-router';

const mapStateToProps = state => {
    return {
        currentProjects: state.uploaderApp.currentProjects,
        selectedProject: state.uploaderApp.selectedProject,
        uploads: state.uploaderApp.uploads,
        initialized: state.uploaderApp.initialized
    }
}

const mapDispatchToProps = dispatch => {
    return {
        test: () => alert("test");
    }
}

//const mergeProps = () => {}

const UploaderContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
    )(UploaderDisplay));

export default UploaderContainer;