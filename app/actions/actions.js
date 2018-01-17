//portal actions
import { routerActions } from 'react-router-redux'
import { setInitialUploaderFlag, unsetInitialUploaderFlag, initializeUploaderApp } from "../uploader/actions/actions.js"
import { setInitialHomeFlag, unsetInitialHomeFlag, initializeHomeApp } from "../home/actions/actions.js"

export const ignore = () => {
    return {
        type: "IGNORE"
    }
}

export const setIdToken = (idToken) => {
    return {
        type: "SET_ID_TOKEN",
        idToken: idToken
    }
}

export const unsetIdToken = () => {
    return {
        type: "UNSET_ID_TOKEN"
    }
}

const updateSignInStatus = (status) => {
    return {
        type: "UPDATE_SIGN_IN_STATUS",
        signedIn: status
    }
}

const loading = (load) => {
    return {
        type: "LOADING",
        loading: load
    }
}

//////////THUNK//////////
export const routeToApp = (path, app) => {
    return (dispatch, getState) => {
        let state = getState(),
            setInitialAppFlag, unsetInitialAppFlag, initializeApp;
        if (!state.portal.signedIn) {
            console.log("Please sign in to continue.");
            return dispatch(ignore());
        }
        
        switch (app) {
            case "homeApp":
                setInitialAppFlag = setInitialHomeFlag;
                unsetInitialAppFlag = unsetInitialHomeFlag;
                initializeApp = initializeHomeApp;
                break;
            case "uploaderApp":
                setInitialAppFlag = setInitialUploaderFlag;
                unsetInitialAppFlag = setInitialUploaderFlag;
                initializeApp = initializeUploaderApp;
                break;
        }
        if (!state[app].initialized && !state[app].initialFlag) {
            console.log("App has not been initialized.");
            dispatch(setInitialAppFlag());
            dispatch(loading(true));
            dispatch(initializeApp())
            .then (() => {
                dispatch(unsetInitialAppFlag);
                console.log("App ready..\nNavigating to route..");
                dispatch(loading(false));
                return dispatch(routerActions.push(path)); 
            });
        } else if (state.routing.location.pathname === path) {
            console.log("App is already routed correctly.");
            return dispatch(ignore());
        } else {
            return dispatch(routerActions.push(path));
        }
    }
}

//////////THUNK//////////
export const googleSignIn = parameters => {
    return (dispatch, getState) => {
        let auth2 = gapi.auth2.getAuthInstance();
        let idToken = auth2.currentUser.get().getAuthResponse().id_token;
        console.log("Login successful!");
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      
        dispatch(updateSignInStatus(true));
        return dispatch(setIdToken(idToken));
    }
}

export const googleSignOut = () => {
    return (dispatch, getState) => {
        console.log("Signed out.");
        dispatch(updateSignInStatus(false));
        return dispatch(unsetIdToken());
    }
}

