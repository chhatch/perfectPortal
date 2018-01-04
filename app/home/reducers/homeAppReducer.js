import { combineReducers } from 'redux'
import {routerReducer } from 'react-router-redux'

const initialState = {
    initialFlag: false,
    initialized: false
}

const homeAppReducer = function (state = initialState, action) {
    switch (action.type) {
        case "INITIALIZE":
            return Object.assign({}, state)
        case "SET_INITIAL_HOME_FLAG":
            return Object.assign({}, state, {initialFlag: true, initialized: false})
        case "UNSET_INITIAL_HOME_FLAG":
            return Object.assign({}, state, {initialFlag: false, initialized: true})
        default:
            return state
    }
}

export default homeAppReducer;