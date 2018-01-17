import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

import { robotReducer } from "./robotReducer.js"
import homeAppReducer from "../home/reducers/homeAppReducer.js"
import uploaderAppReducer from "../uploader/reducers/uploaderAppReducer.js"
import itemAppReducer from "../productTerminal/reducers/itemAppReducer.js"

const intialPortalState = {
    signedIn: false,
    loading: false
}

const portalReducer = function (state, action) {
    switch (action.type) {
        case "INITIALIZE":
            return Object.assign({}, state)
        case "SET_ACCESS_TOKEN":
            return Object.assign({}, state, {accessToken: action.accessToken })
        case "SET_ACCESS_TOKEN":
            return Object.assign({}, state, {accessToken: "" })
        case "UPDATE_SIGN_IN_STATUS":
            return Object.assign({}, state, {signedIn: action.signedIn})
        case "LOADING":
            return Object.assign({}, state, {loading: action.loading})
        case "IGNORE":
        default:
            return state || intialPortalState
    }
}

export const appReducer = combineReducers({
        portal: portalReducer,
        robot: robotReducer,
        homeApp: homeAppReducer,
        uploaderApp: uploaderAppReducer,
        itemApp: itemAppReducer,
        routing: routerReducer
        });
