////Uploader
import { getCurrentProjects } from "../../utilities/googleSheets.js"
import { fileReader } from "../../utilities/fileUtilities.js"

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
            getCurrentProjects(dispatch, getState)
            .then((currentProjects) => {
                dispatch(setCurrentProjects(currentProjects));
                //make sure there actually is a current project
                if (currentProjects && currentProjects[0]) {
                    //selected project initializes to first in list
                    dispatch(setSelectedProject(0));
                }
                resolve();
            });
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
            folderPath = state.uploaderApp.selectedProject.folderPath || "/testPath";
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
            } else {
                console.log("Upload already in progress..")
            }
            dispatch(uploadToDropBox());
            
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

export const uploadToDropBox = () => {
    return (dispatch, getState) => {
        const state = getState(),
            filesInQueue = state.uploaderApp.files.length > 0;
        if (filesInQueue) {
            const file = getState().uploaderApp.files[0],
                url = "https://content.dropboxapi.com/2/files/upload",
                body = file.data,
                dbxArgs = {
                    "path": file.folderPath + "/" + file.name,
                    "mode": "overwrite",
                    "autorename": false,
                    "mute": false
                },
                headers = {
                    "Authorization": "Bearer " + "SeMSokkAa1AAAAAAAAABYKeglZ0HMcvYthEH1k6EeONTM-Wb9LsuxhrK02Hht8Fn", // perfect settings"T6O_4znrgLUAAAAAAAExx-k3mr3iJaTTiD2q5onGSAfLeiMUJZE15BMTBzIKwB8Q",
                    "Content-Type": "application/octet-stream",
                    "Dropbox-API-Arg": JSON.stringify(dbxArgs)
                },
                request = new Request(url, {
                    method: "POST",
                    headers: new Headers(headers),
                    body: body
                });
            fetch(request)
                .then((response) => {
                    console.log("response ok? %s", response.ok)
                    dispatch(removeFileFromQueue(response.ok));
                    return dispatch(uploadToDropBox());
                })
        } else {
            console.log("No files remaining.");
            return dispatch(unsetUploadingFlag());
        }

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