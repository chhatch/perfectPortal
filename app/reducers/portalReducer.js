import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

import { robotReducer } from "./robotReducer.js"
import homeAppReducer from "../home/reducers/homeAppReducer.js"
import uploaderAppReducer from "../uploader/reducers/uploaderAppReducer.js"
import itemAppReducer from "../productTerminal/reducers/itemAppReducer.js"

const portalReducer = function (state, action) {
    switch (action.type) {
        case "INITIALIZE":
            return Object.assign({}, state)
        case "SET_ACCESS_TOKEN":
            return Object.assign({}, state, {accessToken: action.accessToken })
        case "SET_ACCESS_TOKEN":
            return Object.assign({}, state, {accessToken: "" })
        case "IGNORE":
        default:
            return state || {}
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
