import { connect } from 'react-redux'
import Uploader from "../container/Uploader.js"
import ProjectSelector from "./ProjectSelector.js"

let UploaderDisplay = (props) => {
    return (
        <div>
            < ProjectSelector currentProjects={props.currentProjects} selectedProject={props.selectedProject}/>
            < Uploader />
        </div>
    );
}

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
        test: () => alert("test")
    }
}

UploaderDisplay = connect(
    mapStateToProps,
    mapDispatchToProps
    )(UploaderDisplay);

export default UploaderDisplay;