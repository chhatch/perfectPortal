import {
    combineReducers
} from 'redux'

const initialState = {
    toggle: true
}

const uploaderReducer = function (state = initialState, action) {
    switch (action.type) {
        case "TOGGLE":
            const toggle = !state.toggle;
            return {...state, toggle: toggle}
        default:
            return state;
    }
}

export default uploaderReducer