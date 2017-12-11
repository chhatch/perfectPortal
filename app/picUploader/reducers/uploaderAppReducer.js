import {
    combineReducers
} from 'redux'

const initialState = {
    currentProjects: [],
    selectedProject: "",
    uploads: 0,
    initialized: false
}

const uploaderReducer = function (state = initialState, action) {
    switch (action.type) {
        case "INITIATE_UPLOADER":
            return Object.assign({}, action.initialState)
        case "TOGGLE_ITEM_INFO":
        //this will work for now..
            let updatedItems = state.items.map(item => {
                return Object.assign({}, item);
            });
            updatedItems[action.index].hidden = !updatedItems[action.index].hidden;
            return Object.assign({}, state, {
                items: updatedItems
            })
        default:
            return state;
    }
}

export default uploaderReducer