////Uploader
import { getCurrentProjects } from "../../utilities/googleSheets.js"
import { fileReader } from "../../utilities/fileUtilities.js"
import { uploadToDropBox, getDropBoxFolders } from "../../actions/dropBox.js"

export const ignore = () => {
    return {
        type: "IGNORE"
    }
}

export const setInitialUploaderFlag = () => {
    return {
        type: "SET_INITIAL_UPLOADER_FLAG"
    }
}

export const unsetInitialUploaderFlag = () => {
    return {
        type: "UNSET_INITIAL_UPLOADER_FLAG"
    }
}

export const initializeUploaderApp = () => {
    console.log("Let the initialization begin!!")
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const state = getState(),
                folders = [...state.uploaderApp.folders],
                promise1 = getCurrentProjects(dispatch, getState),
                promise2 = getSubfolders(folders),
                promiseArray = [promise1, promise2];
            promise1
            .then((currentProjects) => {
                dispatch(setCurrentProjects(currentProjects));
                //make sure there actually is a current project
                if (currentProjects && currentProjects[0]) {
                    //selected project initializes to first in list
                    dispatch(setSelectedProject(0));
                }
            });
            promise2
            .then((folders) => {
                dispatch(updateUploaderFolders(folders))
            })
            Promise.all(promiseArray)
            .then(() => {
                resolve();
            })
        })
    }
}

export const setCurrentProjects = (currentProjects) => {
    return {
        type: "SET_UPLOADER_PROJECTS",
        currentProjects: currentProjects
        
    }
}

export const setSelectedProject = (selectedProjectIndex) => {
    return {
        type: "SET_SELECTED_PROJECT",
        selectedProjectIndex: selectedProjectIndex
        
    }
}

export const uploadPics = (files) => {
    return (dispatch, getState) => {
        let fileReaderPromiseArray = [],
            fileArray = [];
        const state = getState(),
            projectName = state.uploaderApp,
            defaultPath = state.uploaderApp.defaultFolderPath,
            folders = state.uploaderApp.folders,
            projectFolderName = state.uploaderApp.selectedProject.folderName || "Unknown Project",
            folderPath = checkFolderPath(folders, state.uploaderApp.selectedProject.folderName) || defaultPath + projectFolderName;
        for (let file of files) {
            let promise = fileReader(file);
            fileReaderPromiseArray.push(promise);
            promise.then((data) => {
                fileArray.push({
                    name: file.name,
                    folderPath: folderPath,
                    data: data
                });
            });
        }
        Promise.all(fileReaderPromiseArray)
        .then(() => {
            dispatch(pushToUploadQueue(fileArray));
            let uploading = state.uploaderApp.uploading;
            if (!uploading) {
                dispatch(setUploadingFlag());
                dispatch(uploadToDropBox());
            } else {
                console.log("Upload already in progress..")
            }
            
        });
    }
}

export const pushToUploadQueue = (files) => {
    return {
        type: "PUSH_TO_UPLOAD_QUEUE",
        newFiles: files
    }
}

export const removeFileFromQueue = (success) => {
    return {
        type: "REMOVE_FILE_FROM_QUEUE",
        success: success
    }
}

export const setUploadingFlag = () => {
    return {
        type: "SET_UPLOADING_FLAG"
    }
}

export const unsetUploadingFlag = () => {
    return {
        type: "UNSET_UPLOADING_FLAG"
    }
}

export const retryFailed = () => {
    return (dispatch, getState) => {
        const state = getState(),
            failedUploads = state.uploaderApp.failedUploads.length > 0,
            uploading = state.uploaderApp.uploading;
        if (failedUploads) {
            dispatch(moveFailedToPending());
            if (!uploading) {
                dispatch(setUploadingFlag());
                return dispatch(uploadToDropBox());
            }
        } else {
            console.log("No failed uploads to retry.")
            return dispatch(ignore());
        }
    }
}

export const moveFailedToPending = () => {
            console.log("Moving failed uploads to pending..");
    return {
        type: "MOVE_FAILED_TO_PENDING"
    }
}

export const updateUploaderFolders = (folders) => {
    return {
        type: "UPDATE_UPLOADER_FOLDERS",
        folders: folders
    }
}

export const getSubfolders = (folders) => {
    return new Promise((resolve, reject) => {
        for (let folder of folders) {
            getDropBoxFolders(folder.path)
            .then((subfolders) => {
                folder.subfolders = subfolders;
            });
        }
        resolve(folders);
    });
}

const checkFolderPath = (folders, name) => {
    let folderName = name.toLowerCase(),
        path = false;
    for (let folder of folders) {
    let subfolders = folder.subfolders;
        for (let subfolder of subfolders) {
            if (subfolder.name === folderName) {
                path = subfolder.path;
                return path;
            }
        }
    }
    console.log(path);
    return path;
}