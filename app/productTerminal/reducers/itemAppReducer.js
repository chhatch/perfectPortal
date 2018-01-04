const itemAppReducer = function (state, action) {
    switch (action.type) {
        case "SET_INITIAL_STATE":
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
            return state || {items: [], criteria: []}
    }
}

export default itemAppReducer