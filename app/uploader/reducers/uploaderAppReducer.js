import {
    combineReducers
} from 'redux'

const initialState = {
    currentProjects: ["active0", "active1"],
    selectedProject: {},
    uploads: 0,
    initialFlag: false,
    initialized: false,
    uploading: false,
    files: [],
    successfulUploads: [],
    failedUploads: []
}

const uploaderReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_INITIAL_UPLOADER_FLAG":
            return {...state, initialFlag: true, initialized: false, files: [], successfulUploads: [], failedUploads: []}
        case "UNSET_INITIAL_UPLOADER_FLAG":
            return {...state, initialFlag: false, initialized: true}
        case "SET_UPLOADER_PROJECTS":
            return {...state, currentProjects: action.currentProjects}
        case "SET_SELECTED_PROJECT":
           const project = state.currentProjects[action.selectedProjectIndex]
            return {...state, selectedProject: project}
        case "PUSH_TO_UPLOAD_QUEUE":
            return {...state, files: [...state.files, ...action.newFiles]}
        case "REMOVE_FILE_FROM_QUEUE":
            let files = [...state.files],
            file = files.shift(),
            successfulUploads = [...state.successfulUploads],
            failedUploads = [...state.failedUploads]
            if (action.success) {
                successfulUploads.push({name: file.name, folderPath: file.folderPath});
            } else {
                failedUploads.push({name: file.name, folderPath: file.folderPath, data: file.data})
            }
            //removing first file that was just uploaded..
            return {...state, files: files, successfulUploads: successfulUploads, failedUploads: failedUploads}
        case "MOVE_FAILED_TO_PENDING":
            return {...state, files: [...state.files, ...state.failedUploads], failedUploads: []}
        case "SET_UPLOADING_FLAG":
            return {...state, uploading: true}
        case "UNSET_UPLOADING_FLAG":
            return {...state, uploading: false}
        default:
            return state;
    }
}

export default uploaderReducer