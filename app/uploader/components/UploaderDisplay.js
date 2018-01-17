import { connect } from 'react-redux'
import Uploader from "./Uploader.js"
import ProjectSelector from "./ProjectSelector.js"
import FileCounter from "./FileCounter.js"
import { setSelectedProject, uploadPics } from "../../uploader/actions/actions.js"

let UploaderDisplay = (props) => {
    return (
        <div>
            < ProjectSelector currentProjects={props.currentProjects} selectedProject={props.selectedProject} selectProject={props.selectProject} />
            < Uploader uploadPics={props.uploadPics} />
            < FileCounter pendingUploads={props.pendingUploads} successfulUploads={props.successfulUploads} failedUploads={props.failedUploads}/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentProjects: state.uploaderApp.currentProjects,
        selectedProject: state.uploaderApp.selectedProject,
        uploads: state.uploaderApp.uploads,
        initialized: state.uploaderApp.initialized,
        pendingUploads: state.uploaderApp.files,
        successfulUploads: state.uploaderApp.successfulUploads,
        failedUploads: state.uploaderApp.failedUploads
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectProject: (e) => {
            const projectIndex = e.target.selectedIndex;
            dispatch(setSelectedProject(projectIndex))
        },
        uploadPics: (e) => {
            const files = e.target.files;
            dispatch(uploadPics(files));
        }
    }
}

UploaderDisplay = connect(
    mapStateToProps,
    mapDispatchToProps
    )(UploaderDisplay);

export default UploaderDisplay;